const mongoose=require("mongoose");

const serviceSchema=new mongoose.Schema({
    empId:{
        type:String,
        required:true,
        unique:true
    },
    empName:{
        type: String,
        required: true
    },
    serviceArea:{
        type: String,
        required: true
    }
})

module.exports=mongoose.model("service",serviceSchema)