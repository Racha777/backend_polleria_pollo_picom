
const reclamoController = {};

const { reclamoConfirmedEmail } = require("../helpers/email");

reclamoController.reclamoConfirmed = async (req,res)=>{

    try{
        const {nombre,apellido,dni,correo,celular,dataReclamo} = req.body
        reclamoConfirmedEmail({
                nombre,
                apellido,
                dni,
                correo,
                celular,
                dataReclamo
              });
              return res.status(200).json({
                message: 'Se ha recepcionado su reclamo correctamente'
              });
        
    }
    catch(error){
        console.log(error.message);
    }
}
module.exports = reclamoController;