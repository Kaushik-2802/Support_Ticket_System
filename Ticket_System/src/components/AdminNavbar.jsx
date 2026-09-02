import React from "react";
import { Link } from "react-router-dom";
import "./EmpNavbar.css";

export default function EmpNavbar() {
    return (
        <nav className="emp-navbar">
            <ul>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/">Logout</Link></li>
            </ul>
        </nav>
    )
}