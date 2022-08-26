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

usuarioController.auth = async (req,res)=>{
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
        },process.env.TOKEN_SECRET)

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
          user.token = user._id;
          await user.save();
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
          const error = new Error('El usuario no existe');
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
       id = req.params.id;
     
        const { password } = req.body;
        const user = await usuarioModel.findById({'_id':id},(error,data)=>{
          if(error){
            console.log(error)
          }
          else{
            console.log(data)
          }
        })
       console.log(user)
      if (user) {
        passwordEncriptado = await bcrypt.hash(password,10);
        console.log("password encriptado : " + passwordEncriptado)
        user.password = passwordEncriptado;
        await user.save();
        return res.status(200).json({
          message: 'Nueva contraseña guardada'
        });
      } else {
        const error = new Error('Id inválido');
        return res.status(400).json({
          message: error.message
        });
      }
    } catch (error) {
        console.log(error.message);
    }
  };
module.exports = usuarioController;
