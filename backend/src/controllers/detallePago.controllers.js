const detallePagoController={};

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
        const nuevoDetallePago=new detallePagoModel({
            numero_tarjeta,
            fecha_vencimiento_tarjeta,
            cvv_tarjeta,
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