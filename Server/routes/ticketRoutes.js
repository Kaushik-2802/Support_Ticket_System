const express=require("express");
const{createTicket,getTickets,getEmployeeTicket,getSingleTicket,updateTicket}=require("../controllers/ticketController");

const router=express.Router();

router.post("/",createTicket);
router.get("/",getTickets);
router.get("/employee/:empId",getEmployeeTicket);
router.get("/:ticketId",getSingleTicket);
router.put("/:ticketId",updateTicket);

module.exports=router;