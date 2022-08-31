
const contactoController = {};

const { contactoConfirmedEmail } = require("../helpers/email");

contactoController.contactoConfirmed = async (req,res)=>{

    try{
        const {nombre,apellido,correo,celular,dataContacto} = req.body
        contactoConfirmedEmail({
                nombre,
                apellido,
                correo,
                celular,
                dataContacto
              });
              return res.status(200).json({
                message: 'Tus datos han sido enviado con éxito'
              });
        
    }
    catch(error){
        console.log(error.message);
    }
}
module.exports = contactoController;