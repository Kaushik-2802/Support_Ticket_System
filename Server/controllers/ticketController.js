const Ticket= require("../models/Ticket")

const createTicket= async(req,res)=>{
    try{
    const {empId,empName,service,issueType,assetId,description,severity,}=req.body;
    if(!empName || !service || !issueType || !assetId || !description || !severity){
        return res.status(400).json({msg:"Missing details cannot create ticket"});
    }
    const newTicket= await Ticket.create({
        ticketId: `TKT${Date.now()}`,empId,empName,service,issueType,assetId,description,severity});

    res.status(200).json({msg:"Ticket created succesfully",ticket: newTicket});
}catch(err){
    res.status(500).json({msg:err.message});
} 
};

const getTickets= async(req,res)=>{
    try{
        const Tickets= await Ticket.find().sort({createdAt:-1});
        res.status(200).json(Tickets);
    }catch(err){
        res.status(500).json({msg: err.message})
    }
}

const getEmployeeTicket= async(req,res)=>{
    try{
        const { empId }=req.params;
        if(!empId){
           return res.status(400).json({msg: "missing employee id please provide it"});
        }
        const empTickets= await Ticket.find({empId}).sort({createdAt:-1});
        res.status(200).json(empTickets);
    }catch(err){
        res.status(500).json({msg: err.message});
    }
}

const getSingleTicket=async(req,res)=>{
    try{
        const { ticketId }=req.params;
        const ticket=await Ticket.findOne({ticketId})

        if(!ticket){
           return res.status(400).json({msg:"Cannot find the ticket with given id"});
        }

        res.status(200).json(ticket);
    }catch(err){
        res.status(500).json({msg:err.message})
    }
};

const updateTicket=async(req,res)=>{
    try{
        const {ticketId}= req.params;
        const ticket=await Ticket.findOneAndUpdate({
            ticketId,
        },
        req.body,
        {
            new:true
        }
    );
    if(!ticket){
       return res.status(400).json({msg:"Cannot find the ticket with given id"});
    }
    res.status(200).json({msg:"Ticket updated successfully",ticket});
    }catch(err){
        res.status(500).json({msg:err.message});
    }
}

module.exports={
    createTicket,
    getTickets,
    getEmployeeTicket,
    getSingleTicket,
    updateTicket
}
