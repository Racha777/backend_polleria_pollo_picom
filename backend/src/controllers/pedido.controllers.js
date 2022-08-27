const pedidoController={};

const pedidoModel=require('../models/pedido.model');

pedidoController.create=async (req,res)=>{
    try{
        const {id,fecha_registro,cliente_id,lista_platos}=req.body;
        console.log(lista_platos);
        let monto_total=0;
        lista_platos.forEach((item)=>{
            console.log(item.precio);
            monto_total+=item.precio;
        });
        console.log(monto_total);
        const nuevoPedido=new pedidoModel({
            fecha_registro,
            monto_total,
            cliente_id,
            lista_platos
        });
        await nuevoPedido.save();
        res.json(nuevoPedido);
    }catch(error){
        console.log(error);
    }
}

module.exports=pedidoController;