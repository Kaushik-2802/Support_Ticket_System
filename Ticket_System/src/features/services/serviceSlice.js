import { createSlice } from "@reduxjs/toolkit";

const initialState={
    services:[
        {
            id:"SW",
            name:"Software",
            enabled:true,
            issueTypes: [
                "Application not working",
                "Installation request",
                "License issue",
                "Accessability issue",
                "other"
            ]
        },
        {
            id:"HW",
            name:"Hardware",
            enabled:true,
            issueTypes:[
                "device issue",
                "request new device",
                "other"
            ]
        },
        {
            id:"NW",
            name:"Network",
            enabled:true,
            issueTypes:[
                "Internet issue",
                "VPN issue",
                "wi-fi module issue",
                "other"
            ]
        }
    ]
}

const serviceSlice=createSlice({
    name: "service",
    initialState,
    reducers:{
        addService(state,action){
            state.services.push(action.payload);
        },
        toggleService(state,action){
            const service=state.services.find(
                (service)=> service.id===action.payload
            )

            if(service){
                service.enabled= !service.enabled
            }
        }
    }
})

export const {addService,toggleService}=serviceSlice.actions;

export default serviceSlice.reducer;