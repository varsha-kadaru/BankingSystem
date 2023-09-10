const express=require("express")
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");

const userRoute=require("./routes/users")
const transferRoute=require("./routes/transfers")

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Banking",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("Connection succesful"))
.catch(err=>console.log(err))


app.use("/api/users",userRoute);
app.use("/api/transfers",transferRoute)

app.listen(5000,()=>{
    console.log("Server running")
})