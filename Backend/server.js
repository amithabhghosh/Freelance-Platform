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
const PaymentRoute=require("./Routes/PaymentRoute")
connectDb()

const allowedOrigin = "http://localhost:5173";

app.use(cors({
  origin: allowedOrigin,  // Use the exact frontend URL here
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true  // Allow credentials to be sent
}));
app.use(express.json())
app.use(bodyParser.json())


app.use("/api/client",ClientRoute)
app.use("/api/freelancer",FreelancerRoute)
app.use("/api/admin",AdminRoute)
app.use("/api/message",MessageRoute)
app.use("/api/review",ReviewRoute)
app.use("/api/payment",PaymentRoute)


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log(`Server Running in the ${port}`)
})