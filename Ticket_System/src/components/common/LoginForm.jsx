import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../features/auth/authSlice";
import {useDispatch} from "react-redux";
import "./Login.css"

export default function LoginForm({role}){
    const [empId,setEmpId]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        setError("");
        let validUser=null;
        if(role==="Employee"){
            if(empId==="2488429" && password==="EMP001"){
            validUser={
                empId:"2488429",
                name:"emp1",
                role:"Programmer analyst trainee"
            }
        }
        }
        else if(role==="Admin"){
            if(empId==="1" && password==="Admin1"){
            validUser={
                empId:"1",
                name:"Admin1",
                role:"system admin"
            }
        }
        }
            if(! validUser){
                setError("Invalid employee id or password")
                return;
            }

        dispatch(login({
            user: validUser,
            token:"mock-token"
        }))

        if(role==="Employee"){
            navigate("/employee/home");
        }
        if(role==="Admin"){
            navigate("/admin/dashboard");
        }
    }
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Support Ticketing System</h1>
                <h2>{role === "Employee" ? "Employee login" : "Admin login"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="empId">Employee Id</label>
                        <input
                            type="text"
                            name="empId"
                            id="empId"
                            placeholder="Enter your employee id"
                            value={empId}
                            onChange={(e) => setEmpId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}
                    <button type="submit" id="submit_btn" name="login" >Login</button>
                </form>
            </div>
        </div>
    )
}