const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DetallesPagoSchema=new Schema({
    numero_tarjeta:{
        required:true,
        type:String
    },
    fecha_vencimiento_tarjeta:{
        required:true,
        type:String
    },
    cvv_tarjeta:{
        required:true,
        type:String
    },
    nombre_tarjeta:{
        required:true,
        type:String
    },
    apellido_tarjeta:{
        required:true,
        type:String
    },
    email_tarjeta:{
        required:true,
        type:String
    },
    cuotas:{
        required:true,
        type:Number
    },
    monto:{
        required:true,
        type:Number
    },
},{
    timestamps:true,
    versionKey:false
});

module.exports=mongoose.model('pagos',DetallesPagoSchema);