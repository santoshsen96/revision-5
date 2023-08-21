const mongoose=require('mongoose')
const doctorSchema=mongoose.Schema({
   name:String,
   image:String,
   specialization:String,
   experience:Number,
   location:String,
   date: { type: Date, default: Date.now },
   slots:Number,
   fee:Number
},{
    versionKey:false
})

const doctorModel=mongoose.model("doctor",doctorSchema)

module.exports={
    doctorModel
}