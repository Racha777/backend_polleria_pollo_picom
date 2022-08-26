const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    usuario:{
        type:String,
        required:true,
        minlength:2,
        maxlength:30,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    correo:{
        type:String,
        required:true,
        minlength:10,
        maxlength:100,
        unique:true
    }
},
{
    timestamps:true,
    versionKey:false
}
)

module.exports = mongoose.model('usuarios',UsuarioSchema);