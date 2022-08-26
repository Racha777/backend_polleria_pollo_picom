const reservaController = {};

const reservaModel = require('../models/reserva.model');


reservaController.getAll = async (req,res) =>{
    const reservas = await reservaModel.find();
    res.json({
        status:true,
        content:reservas
    });
}

reservaController.create = async (req,res) =>{
    
    try{
     const nuevaReserva = new reservaModel(req.body)
     await nuevaReserva.save();
     res.json({
         status:true,
         content:nuevaReserva
     });
   }catch(error){
     res.status(500).json({
         status:false,
         content:'Error :' + error
     })

   } 
 }
 reservaController.getById = async(req,res)=>{
    const {id} = req.params;
    const reserva = await reservaModel.findById(id);
    res.json({
        status:true,
        content:reserva
    });
}

reservaController.update = async (req,res) =>{
    const {id} = req.params;
    const reservaEditada = await reservaModel.findOneAndUpdate({_id: id },req.body,{
        returnOriginal: false
    })

    res.json({
        status:true,
        content:reservaEditada
    });
}

reservaController.deleteOne = async (req,res) =>{
    const {id} = req.params;
  
    reservaModel.findByIdAndDelete(id,function(err,docs){
        if(err){
            console.log(err)
        }
        else{
            res.json({
                status:true,
                content:'Reserva eliminada'
            })
        }
    })
}
 
module.exports = reservaController;