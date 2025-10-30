import React, { useState } from "react";
import Sidebar from "./components/dashboard/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import CandidateDetails from "./components/profilequeue/CandidateDetails";
import CandidateInfo from "./components/profilequeue/CandidateInfo";
import ResumeTrackingTask from "./components/trackingqueue/ResumeTrackingTask";
import ReadyForReviewTask from "./components/trackingqueue/ReadyForReviewTask";
import JobQueue from "./components/jobqueue/JobQueue";
import "./App.css";

export default function App() {
  const [section, setSection] = useState(""); // empty initially shows welcome page
  const [queueType, setQueueType] = useState("");

  const renderContent = () => {
    if (!section) {
      return (
        <div className="main-content">
          <div className="header-footer">
            <h1>Marketing, Recruiting and Sales System.</h1>
          </div>

          <div
            className="content-card"
            style={{ margin: "50px auto", maxWidth: "500px" }}
          >
            <h1 className="title">Welcome to MARS Dashboard</h1>
            <p>Select a menu option to view data.</p>
          </div>

          <div className="header-footer">
            <p>All Rights Reserved. DNCS Global 2020.</p>
          </div>
        </div>
      );
    }

    switch (section) {
      case "dashboard":
      case "addLead": 
        return (
          <Dashboard
            section={section}               
            setSection={setSection}
            setQueueType={setQueueType}
          />
        );
      case "candidateDetails":
        return <CandidateDetails />;
      case "candidateInfo":
        return <CandidateInfo />;
      case "interviewSubmitted":
        return <ResumeTrackingTask />;
      case "interviewNotSubmitted":
        return <ReadyForReviewTask />;
      case "jobQueue":
        return <JobQueue type={queueType} />;
      default:
        return (
          <div className="main-content">
            <h1>Welcome to MARS Dashboard</h1>
          </div>
        );
    }
  };

  return (
    <div className="app">
      <Sidebar setSection={setSection} setQueueType={setQueueType} />
      <div className="content">{renderContent()}</div>
    </div>
  );
}
