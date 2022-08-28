require('dotenv').config();

const nodemailer = require("nodemailer");

const passwordRecoveryEmail = async (user) => {

   const { usuario, correo, _id } = user;
   let transport = nodemailer.createTransport({
     host: process.env.NODEMAILER_HOST,
     port:process.env.NODEMAILER_PORT,
     auth: {
       user: process.env.NODEMAILER_USER,
       pass: process.env.NODEMAILER_PASS
     }
   });
 
   await transport.sendMail({
     from: '"<admin@picom.com>',
     to: correo,
     subject: 'noreply@picom.com',
     text: 'Reestablece tu password',
     html: `
       <p>Hola ${usuario}, solicitaste reestablecer tu password.</p>
       <p>Reestablece tu password en el siguiente enlace:</p>
       <a href="http:localhost:3000/new-password/${_id}">Reestablecer password</a>
       <p>Si tú no lo solicitaste, ignora el mensaje.</p>
     `
   });
 };

 const reservaConfirmedEmail = async (reserva)=>{

  const { solicitante, dni,correo,fecha,hora, motivo} = reserva;
  let transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST_ADMIN,
    port:process.env.NODEMAILER_PORT_ADMIN,
    auth: {
      user: process.env.NODEMAILER_USER_ADMIN,
      pass: process.env.NODEMAILER_PASS_ADMIN
    }
  });

  await transport.sendMail({
    from: `${correo}`,
    to: "admin@picom.com",
    subject: 'Reserva',
    text: 'Reserva tu local',
    html: `
      <p>Hola soy ${solicitante}, identificado con dni ${dni},
       quiero realizar una reserva el día ${fecha} a las ${hora},
       por el motivo de ${motivo}.</p>
    `
  });
};


const contactoConfirmedEmail = async (contacto)=>{

  const { nombre, apellido,correo,celular,dataContacto} = contacto;
  let transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST_ADMIN,
    port:process.env.NODEMAILER_PORT_ADMIN,
    auth: {
      user: process.env.NODEMAILER_USER_ADMIN,
      pass: process.env.NODEMAILER_PASS_ADMIN
    }
  });

  await transport.sendMail({
    from: `${correo}`,
    to: "admin@picom.com",
    subject: 'Contacto',
    text: 'Contacto con el admin',
    html: `
      <p>${dataContacto} <br/> <br/>
      Adjunto mis datos <br/>
      Nombre: ${nombre}<br/>
      Apellido: ${apellido}<br/>
      Celular: ${celular}<br/>
      </p>
    `
  });
};

const reclamoConfirmedEmail = async (reclamo)=>{

  const { nombre, apellido,dni,correo,celular,dataReclamo} = reclamo;
  let transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST_ADMIN,
    port:process.env.NODEMAILER_PORT_ADMIN,
    auth: {
      user: process.env.NODEMAILER_USER_ADMIN,
      pass: process.env.NODEMAILER_PASS_ADMIN
    }
  });

  await transport.sendMail({
    from: `${correo}`,
    to: "admin@picom.com",
    subject: 'Reclamo',
    text: 'Reclamo',
    html: `
      <p>${dataReclamo} <br/> <br/>
      Mis datos <br/> <br/>
      Nombre: ${nombre}<br/>
      Apellido: ${apellido}<br/>
      Celular: ${celular}<br/>
      DNI: ${dni}<br/>
      </p>
    `
  });
};

 module.exports = {passwordRecoveryEmail,reservaConfirmedEmail,contactoConfirmedEmail,reclamoConfirmedEmail}
