const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PedidoDetalleSchema=new Schema({
    plato_id:{
        required:true,
        type:Number
    },
    cantidad:{
        required:true,
        type:Number,
        min:1
    },
    subtotal:{
        required:true,
        type:Number
    }
},
{
    timestamps:false,
    versionKey:false
});

module.exports=mongoose.model('pedidos',PedidoDetalleSchema);