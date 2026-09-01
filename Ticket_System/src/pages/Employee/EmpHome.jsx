import React from "react";
import { useSelector } from "react-redux";
import EmpNavbar from "../../components/EmpNavbar";
import "./EmpHome.css"

export default function EmpHome(){
    const {user}=useSelector((state)=>state.auth);

    return(
        <>
        <EmpNavbar />
         <div className="emp-home">
            <h1>Employee Home</h1>

            <h2> Welcome! {user.name}</h2>
            <p>Employee ID: {user.empId}</p>
            <p>Role: {user.role}</p>
        </div>
        </>
    )
}

