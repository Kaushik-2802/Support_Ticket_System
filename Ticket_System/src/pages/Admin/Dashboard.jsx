import React, {useState, useEffect, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets } from "../../features/tickets/ticketSlice";
import AdminNavbar from "../../components/AdminNavbar"
import "./Dashboard.css"

const status_catgs={
    OPEN:["OPEN","ASSIGNED"],
    IN_PROGRESS:["IN-PROGRESS"],
    CLOSED:["RESOLVED","REJECTED","CLOSED"]
}

const tabs=[{key: "OPEN",label:"Open"},{key:"IN_PROGRESS",label:"In Progress"},{key:"CLOSED",label:"Closed"}]

const dateFilters=[
    {key:"ALL",label:"All Time"},
    {key:"TODAY",label:"Today"},
    {key:"WEEK",label:"This Week"},
    {key:"MONTH",label:"This Month"},
    {key:"CUSTOM",label:"Custom Range"}
]

function matchesDateFilter(createdAt,dateFilter,customFrom,customTo){
    if(dateFilter==='ALL') return true;
    const ticketDate=new Date(createdAt);
    const now=new Date();
    if(dateFilter==="CUSTOM"){
        if(!customFrom && !customTo) return true;
        const from=customFrom? new Date(customFrom):null;
        const to=customTo? new Date(customTo):null;
        if (to) to.setHours(23,59,59,999);
        if(from && ticketDate<from) return false;
        if(to && ticketDate>to) return false;
        return true;
    }
    if(dateFilter==="TODAY"){
        return ticketDate.toDateString()=== now.toDateString();
    }
    if(dateFilter==="WEEK"){
        const startWeek=new Date(now);
        startWeek.setDate(now.getDate()-now.getDay());
        startWeek.setHours(0,0,0,0);
        return ticketDate>=startWeek && ticketDate<=now;
    }
    if(dateFilter==="MONTH"){
        return(
            ticketDate.getFullYear()===now.getFullYear() && ticketDate.getMonth()=== now.getMonth()
        );
    }
    return true;
}
export default function Dashboard(){
        const {user}=useSelector((state)=>state.auth);
        const dispatch=useDispatch();
        const {tickets,loading,error}=useSelector((state)=>state.tickets)
        const [activeTab,setActiveTab]=useState("OPEN")
        const [dateFilter,setDateFilter]=useState("ALL")
        const [customFrom,setCustomFrom]=useState("")
        const [customTo,setCustomTo]=useState("")

        useEffect(()=>{
            dispatch(getTickets())
        },[dispatch,user])

        const dateFilteredTkt=useMemo(
            ()=>tickets.filter((t)=>matchesDateFilter(t.createdAt,dateFilter,customFrom,customTo)),
            [tickets,dateFilter,customFrom,customTo]
        )

        const countInGroup=(groupKey)=>dateFilteredTkt.filter((t)=>status_catgs[groupKey].includes(t.status)).length
        const filteredTickets=dateFilteredTkt.filter((t)=>status_catgs[activeTab].includes(t.status))
        const activeLabel=tabs.find((t)=>t.key===activeTab).label
        return(
            <>
            <AdminNavbar />
            <div className="track-requests-page">
                <h1>Track Your Requests</h1>
                <div className="filter-toolbar">
            <div className="date-filters" role="tablist" aria-label="Filter by date">
                {dateFilters.map((df) => (
                    <button
                        key={df.key}
                        type="button"
                        role="tab"
                        aria-selected={dateFilter === df.key}
                        className={dateFilter === df.key ? "date-filter active" : "date-filter"}
                        onClick={() => setDateFilter(df.key)}
                    >
                        {df.key === "CUSTOM" && (
                            <svg className="cal-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                        )}
                        {df.label}
                    </button>
                ))}
            </div>

            {dateFilter === "CUSTOM" && (
                <div className="custom-date-range">
                    <label>
                        <span>From</span>
                        <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} />
                    </label>
                    <span className="range-sep">–</span>
                    <label>
                        <span>To</span>
                        <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} />
                    </label>
                    {(customFrom || customTo) && (
                        <button
                            type="button"
                            className="clear-range"
                            onClick={() => { setCustomFrom(""); setCustomTo(""); }}
                        >
                            Clear
                        </button>
                    )}
                </div>
            )}
            </div>
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