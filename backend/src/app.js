const express=require('express');
const {config}=require('./config');


//Importamos middlewares
const cors=require('cors');

const app=express();
app.set('port',config.port);

//middlewares
app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        status:true,
        content:"Servidor activo pollo picom"
    })
})

//rutas
app.use('/usuario',require('./routes/usuario.routes'));
app.use('/login',require('./routes/login.routes'));
app.use('/reserva',require('./routes/reserva.routes'));
app.use('/contacto',require('./routes/contacto.routes'));
app.use('/reclamo',require('./routes/reclamo.routes'));
app.use('/platos',require('./routes/plato.routes'));
app.use('/pedidos',require('./routes/pedido.routes'));
app.use('/pagos',require('./routes/detallePago.routes'));

//middlewares de errores

module.exports=app;