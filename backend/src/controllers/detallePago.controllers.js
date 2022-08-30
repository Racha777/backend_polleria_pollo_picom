const detallePagoController={};
const bcrypt = require('bcryptjs');
const detallePagoModel=require('../models/detallesPago.model');

detallePagoController.getAll=async (req,res)=>{
    const detallePagos=await detallePagoModel.find();
    res.json(detallePagos);
}

detallePagoController.create=async (req,res)=>{
    try{
        const {
            numero_tarjeta,
            fecha_vencimiento_tarjeta,
            cvv_tarjeta,
            nombre_tarjeta,
            apellido_tarjeta,
            email_tarjeta,
            cuotas,
            monto
        }=req.body;

        const numeroTarjetaEncriptado=await bcrypt.hash(numero_tarjeta,10);
        const cvvEncriptado=await bcrypt.hash(cvv_tarjeta,10);
        const nuevoDetallePago=new detallePagoModel({
            numero_tarjeta:numeroTarjetaEncriptado,
            fecha_vencimiento_tarjeta,
            cvv_tarjeta:cvvEncriptado,
            nombre_tarjeta,
            apellido_tarjeta,
            email_tarjeta,
            cuotas,
            monto
        });
        await nuevoDetallePago.save();
        res.json(nuevoDetallePago);
    }catch(error){
        console.log(error);
    }
}

module.exports=detallePagoController;