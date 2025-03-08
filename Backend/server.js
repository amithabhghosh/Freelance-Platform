const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDb = require("./Config/db");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Message = require("./Models/MessageModel");
const { stripeWebhookHandler } = require("./Controllers/webHookController");
const path = require("path");




// Connect DB
connectDb();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "https://jobo-vkhb.onrender.com",
        methods: ["GET", "POST"],
        credentials: true,
    },    transports: ["websocket", "polling"], // 👈 Add transports

});

app.use(cors({
    origin: ["https://jobo-vkhb.onrender.com"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.static(path.join(__dirname, "Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist", "index.html"));
});

app.use((req, res, next) => {
    if (req.path === "/webhook") {
        next(); 
    } else {
        express.json()(req, res, next);
    }
});


// app.use(bodyParser.json());

// Routes
app.use("/api/client", require("./Routes/ClientRoute"));
app.use("/api/freelancer", require("./Routes/FreelancerRoute"));
app.use("/api/admin", require("./Routes/AdminRoute"));
app.use("/api/message", require("./Routes/MessageRoute"));
app.use("/api/review", require("./Routes/ReviewRoute"));
app.use("/api/payment", require("./Routes/PaymentRoute"));



app.post("/webhook",express.raw({ type: "application/json" }),stripeWebhookHandler)


app.get("/", (req, res) => res.send("Hello World"));


io.on("connection", (socket) => {
    
    socket.on("joinRoom", ({ userId, jobId }) => {
        socket.join(jobId);
       
    });

    socket.on("sendMessage", async (data) => {
        try {
            const { senderId, receiverId, message, jobId, receiverType, senderType,image } = data;
            
    
            io.to(jobId).emit("receiveMessage", {
                senderId, receiverId, message, jobId, receiverType, senderType,image
            });
        } catch (error) {
          return null
        }
    });

    socket.on("disconnect", () => {
        
       
    });
});

httpServer.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
