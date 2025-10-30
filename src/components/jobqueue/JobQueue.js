import React, { useState, useEffect } from "react";
import GlobalQueue from "./GlobalQueue";
import WipQueue from "./WipQueue";
import EscalationQueue from "./EscalationQueue";
import FailedQueue from "./FailedQueue";
import CompletedQueue from "./CompletedQueue";

const JobQueue = ({ type }) => {
  const [activeTab, setActiveTab] = useState("global");

  // Update active tab when type prop changes
  useEffect(() => {
    if (type) {
      setActiveTab(type);
    }
  }, [type]);

  const renderContent = () => {
    switch (activeTab) {
      case "global":
        return <GlobalQueue />;
      case "wip":
        return <WipQueue />;
      case "escalation":
        return <EscalationQueue />;
      case "failed":
        return <FailedQueue />;
      case "completed":
        return <CompletedQueue />;
      default:
        return <GlobalQueue />;
    }
  };

  const tabStyle = {
    padding: "10px 20px",
    margin: "0 5px",
    border: "1px solid #ccc",
    borderRadius: "5px 5px 0 0",
    background: "#f5f5f5",
    cursor: "pointer",
    transition: "all 0.3s ease"
  };

  const activeTabStyle = {
    ...tabStyle,
    background: "#007bff",
    color: "white",
    borderBottom: "1px solid #007bff"
  };

  return (
    <div className="main-content">
      <h2>Job Queue</h2>
      <div className="tab-menu" style={{ marginBottom: "20px", borderBottom: "2px solid #ccc" }}>
        <button 
          style={activeTab === "global" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("global")}
        >
          Global Queue
        </button>
        <button 
          style={activeTab === "wip" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("wip")}
        >
          WIP Queue
        </button>
        <button 
          style={activeTab === "escalation" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("escalation")}
        >
          Escalation Queue
        </button>
        <button 
          style={activeTab === "failed" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("failed")}
        >
          Failed Queue
        </button>
        <button 
          style={activeTab === "completed" ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab("completed")}
        >
          Completed Queue
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default JobQueue;