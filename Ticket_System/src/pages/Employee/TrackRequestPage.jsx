import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeTicket } from "../../features/tickets/ticketSlice";
import EmpNavbar from "../../components/EmpNavbar";
import "./TrackRequestPage.css"

const status_catgs={
    OPEN: ["OPEN","ASSIGNED"],
    IN_PROGRESS:["IN-PROGRESS"],
    CLOSED:["RESOLVED","REJECTED","CLOSED"]
}

const tabs=[{key: "OPEN",label:"Open"},{key:"IN_PROGRESS",label:"In Progress"},{key:"CLOSED",label:"Closed"}]

export default function TrackRequestPage(){
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)
    const {tickets,loading,error}=useSelector((state)=>state.tickets)
    const [activeTab,setActiveTab]=useState("OPEN")

    useEffect(()=>{
        if(user?.empId){
            dispatch(getEmployeeTicket(user.empId))
        }
    },[dispatch,user])

    const countInGroup=(groupKey)=>tickets.filter((t)=>status_catgs[groupKey].includes(t.status)).length
    const filteredTickets=tickets.filter((t)=>status_catgs[activeTab].includes(t.status))
    const activeLabel=tabs.find((t)=>t.key===activeTab).label
    return(
        <>
        <EmpNavbar />
        <div className="track-requests-page">
                <h1>Track Your Requests</h1>

                <div className="status-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            className={activeTab === tab.key ? "tab active" : "tab"}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                            <span className="tab-count">{countInGroup(tab.key)}</span>
                        </button>
                    ))}
                </div>

                {loading && <p className="status-msg">Loading your requests…</p>}
                {error && <p className="status-msg error">{error}</p>}

                {!loading && !error && filteredTickets.length === 0 && (
                    <p className="status-msg">No {activeLabel.toLowerCase()} requests.</p>
                )}

                {!loading && filteredTickets.length > 0 && (
                    <ul className="ticket-list">
                        {filteredTickets.map((ticket) => (
                            <li key={ticket.ticketId} className="ticket-card">
                                <div className="ticket-card-header">
                                    <span className="ticket-id">{ticket.ticketId}</span>
                                    <span className={`status-badge status-${ticket.status.toLowerCase()}`}>
                                        {ticket.status}
                                    </span>
                                </div>
                                <p className="ticket-service">
                                    {ticket.service} — {ticket.issueType}
                                </p>
                                <p className="ticket-description">{ticket.description}</p>
                                <div className="ticket-card-footer">
                                    <span className={`severity-badge severity-${ticket.severity.toLowerCase()}`}>
                                        {ticket.severity}
                                    </span>
                                    <span className="ticket-date">
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}