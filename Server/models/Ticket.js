const mongoose=require("mongoose");

const ticketSchema=mongoose.Schema({
    ticketId:{
        type: String,
        required: true,
        unique: true
    },
    empId:{
        type: String,
        required:true,
    },
    empName:{
        type:String,
        required:true
    },
    service:{
        type: String,
        required: true,
        enum:[
            "Software",
            "Hardware",
            "Network"
        ]
    },
    issueType:{
        type: String,
        required: true
    },
    assetId:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    severity:{
        type: String,
        enum:[
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL"
        ],
        default: "MEDIUM"
    },
    status:{
        type: String,
        enum:[
            "OPEN",
            "ASSIGNED",
            "IN-PROGRESS",
            "RESOLVED",
            "REJECTED",
            "CLOSED"
        ],
        default:"OPEN"
    },
    assignedTo:{
        type: String,
        default: null
    },
    resolution:{
        type: String,
        default: null
    },
    rejectionReason:{
        type: String,
        default: null
    },
},
{
    timestamps: true
}
);

module.exports= mongoose.model("Ticket",ticketSchema);