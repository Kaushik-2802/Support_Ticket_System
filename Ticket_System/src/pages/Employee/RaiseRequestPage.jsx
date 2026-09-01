import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {createTicket} from "../../features/tickets/ticketSlice"
import EmpNavbar from "../../components/EmpNavbar";
import "./RaiseRequestPage.css"

export default function RaiseRequestPage(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.auth);
    const {services}=useSelector((state)=>state.services);
    const [step,setStep]=useState(1);
    const [formData,setFormData]=useState({
        empId:"",
        service:"",
        issueType: "",
        assetId: "",
        description: "",
        severity: "MEDIUM"
    });
    const [ticketId,setTicketId]=useState(null);
    const updateFormData=(field,value)=>{
        setFormData((prev)=>({
            ...prev,
            [field]:value
        }))
    };
    const nextStep=()=>{
        setStep((prev)=>prev+1)
    };
    const prevStep=()=>{
        setStep((prev)=>prev-1)
    };
    const handleSubmit= async()=>{
        const newTicket={
            empId: formData.empId,
            empName: user.name,
            service: formData.service,
            issueType: formData.issueType,
            assetId: formData.assetId,
            description: formData.description,
            severity: formData.severity,
            status:"OPEN",
            assignedTo: null,
            createdAt: new Date().toISOString(),
            resolution: null
        };

        const result= await dispatch(createTicket(newTicket));
        if(createTicket.fulfilled.match(result)){
            setTicketId(result.payload.ticketId)
        }
        setStep(5);
    }

    const selectedService= services.find(
        (service)=>service.name===formData.service
    );

    return(
        <>
         <EmpNavbar /> 
        <div className="raise-request-page">
            <h1>Raise a Service request</h1>

            {step<5 &&(
                <div className="step-indicator">
                    <span className={step>=1?"active":""}>
                        1. Service
                    </span>
                    <span className={step>=2?"active":""}>
                        2. Issue
                    </span>
                    <span className={step>=3?"active":""}>
                        3. Details
                    </span>
                    <span className={step>=4?"active":""}>
                        4. Confirmation
                    </span>
                </div>
            )}

            {step===1 && (
                <div className="form-step">
                    <h2>Select a service</h2>
                    <p>Select the service for which you want to raise a request</p>
                    <div className="service-grid">
                        {services.filter((service)=>service.enabled).map((service)=>(
                            <button key={service.id} type="button" className={formData.service===service.name? "service-card selected":"service-card"}
                              onClick={()=>updateFormData("service",service.name)}>{service.name}</button>
                        ))}
                    </div>
                    <button
                      type="button"
                      disabled={!formData.service}
                      onClick={nextStep}
                    >Next</button>
                </div>
            )}

            {step===2 && (
                <div className="form-step">
                    <h2>Select Issue Type</h2>
                    <p>Service: <strong>{formData.service}</strong></p>
                    <select 
                      value={formData.issueType}
                      onChange={(e)=>
                        updateFormData(
                            "issueType",
                            e.target.value
                        )
                    }>
                        <option value="">Select Issue Type</option>
                        {selectedService?.issueTypes?.map(
                            (issue)=>(
                                <option key={issue} value={issue}>{issue}</option>
                            )
                        )}
                    </select>
                    <div className="navigation-buttons">
                        <button
                         type="button"
                         onClick={prevStep}>Back</button>
                        <button
                         type="button"
                         disabled={!formData.issueType}
                         onClick={nextStep}>Next</button>

                    </div>
                </div>
            )}

            {step===3 && (
                <div className="form-step">
                    <h2>Issue Details</h2>
                    <div>
                        <label>Employee ID</label>
                        <input type="text" placeholder="Enter employee ID" value={formData.empId}
                          onChange={(e)=>updateFormData(
                            "empId",e.target.value
                          )} />
                    </div>
                    <div>
                        <label>Asset ID</label>
                        <input type="text" placeholder="Enter Asset ID" value={formData.assetId}
                          onChange={(e)=>updateFormData(
                            "assetId",e.target.value
                          )} />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea 
                         placeholder="Describe the issue"
                         value={formData.description}
                         onChange={(e)=>updateFormData(
                            "description",e.target.value
                         )}></textarea>
                    </div>
                    <div>
                        <label>Severity</label>
                        <select
                         value={formData.severity}
                         onChange={(e)=>updateFormData(
                            "severity",e.target.value
                         )}>
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                            <option value="CRITICAL">CRITICAL</option>
                         </select>
                    </div>
                    <div className="navigation-buttons">
                        <button
                         type="button"
                         onClick={prevStep}>Back</button>
                        <button
                         type="button"
                         disabled={!formData.description || !formData.assetId}
                         onClick={nextStep}>Review Request</button>

                    </div>
                </div>

            )}

            {step===4 && (
                <div className="form-step confirmation-summary">
                    <h2>Confirm Request</h2>
                    <div>
                        <p>
                            <strong>Employee Name:</strong>{" "}
                            {user.name}
                        </p>
                        <p>
                            <strong>Employee Designation:</strong>{" "}
                            {user.role}
                        </p>
                        <p>
                            <strong>Service:</strong>{" "}
                            {formData.service}
                        </p>
                        <p>
                            <strong>Issue Type:</strong>{" "}
                            {formData.issueType}
                        </p>
                        <p>
                            <strong>Asset Id:</strong>{" "}
                            {formData.assetId}
                        </p>
                        <p>
                            <strong>Description:</strong>{" "}
                            {formData.description}
                        </p>
                        <p>
                            <strong>Severity:</strong>{" "}
                            {formData.severity}
                        </p>
                    </div>
                    <div className="navigation-buttons">
                        <button 
                         type="button"
                         onClick={prevStep}>Edit</button>
                         <button
                          type="button"
                          onClick={handleSubmit}>Submit Request</button>
                    </div>
                </div>
            )}

            {step===5 && (
                <div className="form-step success-step">
                    <h2>Request Submitted Successfully !!!!</h2>
                    <p>Your service request is created</p>
                    <h3>TicketId: {ticketId}</h3>
                    <button type="button" onClick={()=>navigate("/employee/track-request")}>Track request</button>
                    <button type="button" onClick={()=>navigate("/employee/home")}>Go to Home</button>
                </div>
            )}
        </div>
        </>
    )
}
