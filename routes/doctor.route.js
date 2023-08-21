const express=require("express")
const {doctorModel}=require("../model/doctor.model")
const {auth}=require("../middleware/auth.middleware")

const doctorRouter=express.Router()
//doctorRouter.use(auth)

doctorRouter.post("/appointments",auth,async(req,res)=>{
    try{
        const note=new doctorModel(req.body)
        await note.save()
        res.json({msg:"new doctor added",doctorData:req.body})
    }catch(err){
        res.json({error:err.message})
    }
})

doctorRouter.get("/",async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        res.send(doctors)
    }catch(err){
        res.json({error:err.message})
    }
})

doctorRouter.patch("/update/:noteID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID} = req.params
    try{
        const note=await doctorModel.findOne({_id:noteID})
        const userIDinNoteDoc=note.userID
        if(userIDinUserDoc===userIDinNoteDoc){
            await doctorModel.findByIdAndUpdate({_id:noteID},req.body)
            res.json({msg:`${note.name} has updated`})
        }else{
            res.json({msg:"Not authorized"})
        }

    }catch(err){
        res.json({error:err})
    }
    
})

doctorRouter.delete("/delete/:noteID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID} = req.params
    try{
        const note=await doctorModel.findOne({_id:noteID})
        const userIDinNoteDoc=note.userID
        if(userIDinUserDoc===userIDinNoteDoc){
            await doctorModel.findByIdAndDelete({_id:noteID})
            res.json({msg:`${note.name} has deleted`})
        }else{
            res.json({msg:"Not authorized"})
        }

    }catch(err){
        res.json({error:err})
    }
})

//filter by specialization
doctorRouter.get('/specialization/:specialization', async(req, res) => {
    const {specialization} = req.params
    try{
        const doctors=await doctorModel.find({specialization: specialization })
        res.send(doctors)
    }catch(err){
        res.json({error:err.message})
    }
  });
  
  // Sort by date
  doctorRouter.get('/sort/date', async (req, res) => {
    const sortedDoctors = await doctorModel.find().sort({ date: 1 });
    res.json(sortedDoctors);
  });
  
  // Search by doctor name
  doctorRouter.get('/search/:name', async (req, res) => {
    const {name} = req.params
    const searchTerm = req.params.name.toLowerCase();
    const searchedDoctors = await doctorModel.find({ name: { $regex: searchTerm, $options: 'i' } });
    res.json(searchedDoctors);
  });
  

module.exports={
    doctorRouter
}