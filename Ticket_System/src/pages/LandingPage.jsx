import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>Ticketing System</h1>
                <h2>Welcome to the ticketing system</h2>
                <p>Raise service requests and track your existing requests from one place</p>
                <button className="btn-primary" onClick={() => navigate("/login")}>
                    Employee Login
                </button>
            </header>

            <section className="admin-section">
                <h3>Admin</h3>
                <p>Manage incoming requests, assign tickets and resolve issues</p>
                <button className="btn-secondary" onClick={() => navigate("/admin/login")}>
                    Admin Login
                </button>
            </section>
        </div>
    )
}