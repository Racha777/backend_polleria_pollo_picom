const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PedidoSchema=new Schema({
    fecha_registro:{
        required:true,
        type:String
    },
    monto_total:{
        required:true,
        type:Number,
        min:0
    },
    cliente_id:{
        required:true,
        type:String
    },
    lista_platos:{
        required:true,
        type:Array
    }
},
{
    timestamps:false,
    versionKey:false
});

module.exports=mongoose.model('pedidos',PedidoSchema);