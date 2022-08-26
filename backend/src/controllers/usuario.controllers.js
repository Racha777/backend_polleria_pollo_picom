const usuarioController = {}

const usuarioModel = require('../models/usuario.models');

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

module.exports = usuarioController;
