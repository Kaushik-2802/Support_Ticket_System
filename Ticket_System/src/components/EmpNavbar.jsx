import React from "react";
import { Link } from "react-router-dom";
import "./EmpNavbar.css";

export default function EmpNavbar() {
    return (
        <nav className="emp-navbar">
            <ul>
                <li><Link to="/employee/home">Home</Link></li>
                <li><Link to="/employee/raise-request">Raise Request</Link></li>
                <li><Link to="/employee/track-request">Track your request</Link></li>
                <li><Link to="/">Logout</Link></li>
            </ul>
        </nav>
    )
}