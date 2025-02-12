const express=require("express")
require("dotenv").config()
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser")
const connectDb = require("./Config/db")
const port=process.env.port
const ClientRoute=require("./Routes/ClientRoute")
const FreelancerRoute=require("./Routes/FreelancerRoute")
const AdminRoute=require("./Routes/AdminRoute")
const MessageRoute=require("./Routes/MessageRoute")
const ReviewRoute=require("./Routes/ReviewRoute")
connectDb()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


app.use("/api/client",ClientRoute)
app.use("/api/freelancer",FreelancerRoute)
app.use("/api/admin",AdminRoute)
app.use("/api/message",MessageRoute)
app.use("/api/review",ReviewRoute)

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log(`Server Running in the ${port}`)
})