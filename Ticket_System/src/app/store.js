import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import serviceReducer from "../features/services/serviceSlice"
import ticketReducer from "../features/tickets/ticketSlice"
import userReducer from "../features/users/userSlice"

export const store= configureStore({
    reducer:{
        auth: authReducer,
        services: serviceReducer,
        tickets: ticketReducer,
        users: userReducer
    }
})