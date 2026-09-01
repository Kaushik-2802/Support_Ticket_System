const mongoose=require("mongoose");
const express= require("express");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Support_Ticket_system").then(()=>console.log("Connected to database at port 3000"));

app.use("/api/tickets",require("./routes/ticketRoutes"))
app.listen(3000,()=>console.log("Server running on port 3000"));