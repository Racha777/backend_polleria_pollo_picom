const usuarioController = {}

const usuarioModel = require('../models/usuario.models');
const passwordRecoveryEmail = require('../helpers/email')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

usuarioController.getAll = async (req,res) =>{
    const usuarios = await usuarioModel.find();
    res.json({
        status:true,
        content:usuarios
    });
}

usuarioController.getById = async(req,res)=>{
    id = req.params.id;
    const usuario = await usuarioModel.findById(id);
    res.json({
        status:true,
        content:usuario
    });
}

usuarioController.create = async (req,res)=>{
    try {
        const {usuario,password,correo} = req.body

        passwordEncriptado = await bcrypt.hash(password,10);
        console.log("password encriptado : " + passwordEncriptado)

        let data ={
            usuario:usuario,
            password:passwordEncriptado,
            correo:correo
        }

        const nuevoUsuario = new usuarioModel(data)
        await nuevoUsuario.save()

        let dataResponse = {
            id:nuevoUsuario._id,
            usuario:nuevoUsuario.usuario,
            correo:nuevoUsuario.correo
        }

        res.json({
            status:true,
            content:dataResponse
        })
    } catch (error) {
        res.status(400).json({
            message: "Hay un error",
            error: error.message
        })
    }
}

usuarioController.login = async (req,res)=>{
    try {
        const {usuario,password} = req.body
        const result = await usuarioModel.findOne({ usuario })

        let dataResponse = {
            id:result._id,
            usuario:result.usuario,
            correo:result.correo
        }

        const token = jwt.sign({
            id:result._id,
            usuario:result.usuario
        },process.env.TOKEN_SECRET,{expiresIn:"7d"})

        if (!result) {
            res.status(400).json({
              message: "Usuario no encontrado"
            })
          } else {
            bcrypt.compare(password, result.password)
            .then(function (result) {
                result
                  ? res.status(200).json({
                      message: "Login exitoso",
                      content:dataResponse,
                      token: token
                    })
                  : res.status(400).json({ 
                    message: "Contraseña incorrecta" })
              })
        }
    } catch (error) {
        res.status(400).json({
          message: "Hay un error",
          error: error.message
        })
    }
}

usuarioController.userRecoverPassword = async(req,res)=>{
    try {
        const { correo } = req.body;
        const user = await usuarioModel.findOne({ correo });
        if (user) {
          const { usuario, correo, _id } = user;
          console.log(correo)
          passwordRecoveryEmail({
            usuario,
            correo,
            _id
          });
          return res.status(200).json({
            message: 'Verificar la bandeja de entrada de su correo'
          });
        }

        else {
          const error = new Error('Correo inválido');
          return res.status(400).json({
            message: error.message
          });
        }
      } catch (error) {
        console.log(error.message);
      }
}
usuarioController.userNewPassword = async (req, res) => {
    try {
      const {id} = req.params;
      if(mongoose.Types.ObjectId.isValid(id)) {
        console.log('valido')
        const user = await usuarioModel.findById(id);
         console.log(user)
        const { password } = req.body;

        if (user!==null) {
          passwordEncriptado = await bcrypt.hash(password,10);
          user.password = passwordEncriptado;
          await user.save();
          return res.status(200).json({
            message: 'Nueva contraseña guardada'
          });
        } else {
          const error = new Error('Faltan datos');
          return res.status(400).json({
            message: error.message
          });
        }
      } 
      else{
        const error = new Error('Faltan datos');
        return res.status(400).json({
          message: error.message
        });
      }
    
    } catch (error) {
        console.log('error'+error.message);
    }
  };


module.exports = usuarioController;
