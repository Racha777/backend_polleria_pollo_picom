const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PlatoSchema=new Schema({
    id:{
        required:true,
        type:Number,
    },
    nombre:{
        required:true,
        type:String
    },
    precio:{
        required:true,
        type:Number,
        min:0
    },
    imagen:{
        required:true,
        type:String
    }
},
{
    timestamps:false,
    versionKey:false
});

module.exports=mongoose.model('platos',PlatoSchema);