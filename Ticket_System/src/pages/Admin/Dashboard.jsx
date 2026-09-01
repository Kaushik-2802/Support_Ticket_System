import React from "react";
import { useSelector } from "react-redux";
import "./Dashboard.css"

export default function Dashboard(){
        const {user}=useSelector((state)=>state.auth);
        return(
            <>
                <h1>Welcome! {user.name}</h1>
                <p>Admin email: {user.email}</p>
                <p>Admin role: {user.role}</p>
            </>
        )
}