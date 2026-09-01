import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const createTicket= createAsyncThunk("tickets/createTicket",

    async(ticketData, {rejectWithValue})=>{
        try{
            const response= await api.post("/tickets" ,ticketData);
            return response.data.ticket;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Failed to create ticket");
        }
    }
);

export const getTickets= createAsyncThunk("tickets/getTickets",
    
    async(_,{rejectWithValue})=>{
    try{
        const response= await api.get("/tickets");
        return response.data.tickets;
    }catch(err){
    return rejectWithValue(err.response?.data?.message || "Error fetching tickets");
    }
    }
)

export const getEmployeeTicket=createAsyncThunk("/tickets/getEmployeeTicket",
    async(empId,{rejectWithValue})=>{
        try{
            const response= await api.get(`/tickets/employee/${empId}`);
            return response.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Error fetching tickets does employee id exist??")
        }
    }
)

export const getSingleTicket= createAsyncThunk("/tickets/getSingleTicket",
    async(ticketId,{rejectWithValue})=>{
        try{
            const response= api.get(`/tickets/${ticketId}`);
            return response.data.tickets;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Error fetching ticket does the ticket id exist??")
        }
    }
)

export const updateTicket= createAsyncThunk("/tickets/updateTicket",
    async({ticketId, updates},{rejectWithValue})=>{
        try{
            const response=api.put(`/tickets/${ticketId}`,updates);
            return (await response).data.tickets;
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Error updating data ")
        }
    }
)
const initialState={
    tickets:[],
    selectedTicket: null,
    loading: false,
    error: null,

    filters:{
        status: "all",
        severity: "all"
    }
}

const ticketSlice= createSlice({
    name: "tickets",
    initialState,
    reducers:{
        addTicket(state,action){
            state.tickets.push(action.payload)
        },
        selectTicket(state,action){
            state.selectedTicket= action.payload
        },
        updateTicketStatus(state,action){
            const {ticketId, status}=action.payload;
            const ticket=state.tickets.find(
                (ticket)=> ticket.id === ticketId
            )
            if(ticket){
                ticket.status=status;
            }
        },
        assignTicket(state,action){
            const{ticketId, assignedTo}= action.payload;
            const ticket= state.tickets.find(
                (ticket)=> ticket.id=ticketId
            )
            if(ticket){
                ticket.assignedTo=assignedTo,
                ticket.status="ASSIGNED"
            }
        },
        setStatusFilter(state,action){
            state.filters.status=action.payload
        },
        setSeverityFilter(state,action){
            state.filters.severity=action.payload;
        },
        clearSelectedTicket(state,action){
            state.selectedTicket=null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(createTicket.pending, (state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(createTicket.fulfilled, (state,action)=>{
            state.loading=false,
            state.tickets.push(action.payload)
        })
        .addCase(createTicket.rejected, (state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        .addCase(getTickets.pending, (state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(getTickets.fulfilled,(state,action)=>{
            state.loading=false,
            state.tickets=action.payload
        })
        .addCase(getTickets.rejected, (state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        .addCase(getEmployeeTicket.pending, (state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(getEmployeeTicket.fulfilled, (state,action)=>{
            state.loading=false,
            state.tickets=action.payload
        })
        .addCase(getEmployeeTicket.rejected, (state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
        .addCase(getSingleTicket.pending, (state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(getSingleTicket.fulfilled, (state,action)=>{
            state.loading=false,
            state.tickets=action.payload
        })
        .addCase(getSingleTicket.rejected, (state,payload)=>{
            state.loading=false,
            state.error=action.payload
        })
        .addCase(updateTicket.pending, (state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateTicket.fulfilled, (state,action)=>{
            state.loading=false;
            const idx=state.tickets.findIndex(
                (ticket)=>ticket.id===action.payload.id
            );
            if(idx !==-1){
                state.tickets[idx]=action.payload;
            }
            if(state.selectedTicket?.id===action.payload.id){
                state.selectedTicket=action.payload
            }
        })
        .addCase(updateTicket.rejected, (state,action)=>{
            state.loading=false,
            state.error=action.payload
        })
    }
})

export const{
    addTicket,
    selectTicket,
    updateTicketStatus,
    assignTicket,
    setStatusFilter,
    setSeverityFilter,
    clearSelectedTicket
}=ticketSlice.actions;

export default ticketSlice.reducer