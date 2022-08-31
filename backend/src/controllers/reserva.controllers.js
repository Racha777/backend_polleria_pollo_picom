const reservaController = {};

const { reservaConfirmedEmail } = require('../helpers/email');
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

reservaController.reservaConfirmed = async (req,res)=>{

    try{
        const {solicitante,dni,correo,fecha,hora,motivo} = req.body
        const dniValid = await reservaModel.findOne({ dni });
        if(dniValid){
            reservaConfirmedEmail({
                solicitante,
                dni,
                correo,
                fecha,
                hora,
                motivo
              });
              return res.status(200).json({
                message: 'Reserva Confirmada'
              });
        }
        else {
            const error = new Error('Contactarse con soporte');
            return res.status(400).json({
              message: error.message
            });
          }
        
    }
    catch(error){
        console.log(error.message);
    }
    
    
}

module.exports = reservaController;