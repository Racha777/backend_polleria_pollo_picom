
const nodemailer = require("nodemailer");
const passwordRecoveryEmail = async (user) => {
   const { usuario, correo, _id } = user;
   console.log(user)
   let transport = nodemailer.createTransport({
     host: "smtp.mailtrap.io",
     port:2525,
     auth: {
       user: "1416db90d5c002",
       pass: "8ae78ac0b938f6"
     }
   });
 
   await transport.sendMail({
     from: '"Next Project - Administrador de Proyectos" <cuentas@nextproject.com>',
     to: correo,
     subject: 'noreply@picom.com',
     text: 'Reestablece tu password en Next Project',
     html: `
       <p>Hola ${usuario}, solicitaste reestablecer tu password.</p>
       <p>Reestablece tu password en el siguiente enlace:</p>
       <a href="http:localhost:3000/recover-password/${_id}">Reestablecer password</a>
       <p>Si tú no lo solicitaste, ignora el mensaje.</p>
     `
   });
 };

 module.exports = passwordRecoveryEmail
