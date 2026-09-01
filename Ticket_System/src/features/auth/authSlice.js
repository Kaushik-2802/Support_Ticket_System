import { createSlice } from "@reduxjs/toolkit";

const persisted = JSON.parse(localStorage.getItem("auth"));

const initialState={
    user: persisted?.user ?? null,
    token: persisted?.token ?? null,
    isAuthenticated: persisted?.isAuthenticated ?? null
}

const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload.user,
            state.token=action.payload.token,
            state.isAuthenticated=true ,
            localStorage.setItem("auth", JSON.stringify(action.payload));
        },
        logout:(state,action)=>{
            state.user= null,
            state.token=null,
            state.isAuthenticated=false,
             localStorage.removeItem("auth");
        }
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;