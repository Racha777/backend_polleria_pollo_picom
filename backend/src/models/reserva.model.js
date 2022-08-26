const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservaSchema = new Schema({
    solicitante:{
        type:String,
        required:true,
        minlength:2,
        maxlength:100
    },
    dni:{
        type:String,
        required:true,
        minlength:8,
        maxlength:8
    },
    fecha:{
        type:String,
        required:true,
    },
    hora:{
        type:String,
        required:true
    },
    motivo:{
        type:String,
        required:true,
        enum:['Reunión','Cumpleaños','Aniversario']
    }
},
{
    timestamps:false,
    versionKey:false
}
)

module.exports = mongoose.model('reservas',ReservaSchema);