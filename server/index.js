const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
},{
    timestamps : true
})

const userModel = mongoose.model("User",schemaData)

//read data
app.get('/', async(req, res) => {
    const data = await userModel.find({})
    res.json({success : true, data : data});
})

//save data api 

app.post( "/create" ,async( req ,res )=>{
    
     console.log(req.body);
     const data  = new userModel(req.body)
     await data.save()
     res.send({success : true , message : "data saved successfully",  data : data })
})

//update data 
app.put("/update",async (req ,res)=>{
    console.log(req.body);
    const { _id,...rest} =  req.body
    console.log(rest)
    const data = userModel.updateOne({_id : _id},rest)
    res.send({success : true, message : "data updated successfully", data : data })
})

//delete data
app.delete("/delete/:id", async (req ,res)=> {

    const id = req.params.id
    const data = await userModel.deleteOne({ _id : id })
//    if(!data){
//        return res.status(400).send("No Data Found")
//    }
    res.send({ success :true , message:"Deleted Successfully",  data: data})
})


mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(() => { 
    console.log("Connected to MongoDB successfully!") 
    app.listen(PORT, () => console.log( `Server is Runnig on ${PORT}`))

})
.catch((err) => { console.log("Error connecting to MongoDB: ", err) })

