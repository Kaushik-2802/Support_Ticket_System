import { createSlice } from "@reduxjs/toolkit";

const initialState={
    users:[],
    selectedUser:null
}

const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{
        setUsers(state,action){
            state.users.push(action.payload);
        },
        selectUser(state,action){
            state.selectedUser=action.payload
        }
    }
})

export const {setUsers,selectUser}=userSlice.actions;
export default userSlice.reducer 