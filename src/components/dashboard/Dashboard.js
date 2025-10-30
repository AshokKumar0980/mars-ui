import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import jobQueueService from "./jobQueueService";
import AddLeadModal from "./AddLeadModal"; // 👈 new import
import "./dashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

export default function Dashboard({  section, setSection, setQueueType }) {
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const ctx = document.getElementById("statusChart");
    if (!ctx) return;

    const chart = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["WIP", "Escalated", "Failed", "Completed", "On Hold"],
        datasets: [
          {
            label: "Jobs",
            data: [45, 7, 10, 68, 16],
            backgroundColor: ["#cdd503", "#f4b100", "#C04040", "#43bdc0", "#898a78"],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  if (section === "addLead") {
    return (
      <div className="main-content" style={{ height: "100vh", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <h2>Add Lead</h2>
        </div>

        <iframe
          title="Add Lead"
          src="/add-lead.html"
          style={{ width: "100%", height: "calc(100vh - 60px)", border: "none", background: "#fff" }}
        />
      </div>
    );
  }

  const handleTotalLeadsClick = () => {
    if (setQueueType && setSection) {
      setQueueType("global");
      setSection("jobQueue");
    }
  };

  const handleSubmitLead = async (leadData) => {
    const jobId = Date.now();
    const jobEntry = {
      id: jobId,
      ...leadData,
      createdDate: new Date().toISOString().split("T")[0],
      status: "Open",
      priority: "Medium",
      assignedTo: "Unassigned",
    };

    try {
      const result = await jobQueueService.saveJobQueue(jobEntry);
      if (result.success) {
        setSuccessMessage(`Your Job Queue Saved Successfully! (Job ID: ${jobId})`);
        setShowSuccessBanner(true);
        setTimeout(() => setShowSuccessBanner(false), 5000);
        setShowAddLeadModal(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      alert("Failed to save job queue. Please try again.");
    }
  };

  const handleMyTasksClick = () => {
    if (setSection) {
      setSection("interviewSubmitted");
    }
  };

  const handleTotalOnHoldClick = () => {
    if (setQueueType && setSection) {
      setQueueType("onHold");
      setSection("jobQueue");
    }
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div className="header-footer">
        <h1>Marketing, Recruiting and Sales System.</h1>
      </div>

      {/* Page Title */}
      <h1>Dashboard</h1>

      {showSuccessBanner && (
        <div className="success-banner">
          <div className="success-banner-content">
            <span className="success-icon">✓</span>
            <span>{successMessage}</span>
            <button
              className="success-banner-close"
              onClick={() => setShowSuccessBanner(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="kpi-container">
        {/* 👇 Added My Tasks card before Total Leads */}
        <div 
          className="kpi-card" 
          onClick={handleMyTasksClick}
          style={{ cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          <h3>My Tasks</h3>
          <p style={{ color: "blue" }}>12</p>
        </div>

        <div 
          className="kpi-card" 
          onClick={handleTotalLeadsClick}
          style={{ cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          <h3>Total Leads</h3>
          <p style={{ color: "green" }}>120</p>
        </div>

        {/* WIP Deals */}
        <div className="kpi-card">
          <h3>WIP Deals</h3>
          <p style={{ color: "#cdd503" }}>45</p>
        </div>

        {/* Escalations */}
        <div className="kpi-card">
          <h3>Escalations</h3>
          <p style={{ color: "#f4b100" }}>7</p>
        </div>

        {/* Failed */}
        <div className="kpi-card">
          <h3>Failed</h3>
          <p style={{ color: "#C04040" }}>10</p>
        </div>

        {/* Completed */}
        <div className="kpi-card">
          <h3>Completed</h3>
          <p style={{ color: "#43bdc0" }}>68</p>
        </div>

        {/* Total On Hold */}
        <div
          className="kpi-card"
          onClick={handleTotalOnHoldClick}
          style={{
            cursor: "pointer",
            transition: "transform 0.2s",
            textAlign: "center",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <h3>Total On Hold</h3>
          <p style={{ color: "#898a78", fontWeight: "bold", fontSize: "20px" }}>16</p>
        </div>
      </div>

      {/* Main Chart */}
      <canvas id="statusChart" width="500" height="150"></canvas>

      {/* Alerts */}
      <div className="alert-box">
        <h3>🚨 Escalation Alerts</h3>
        <ul>
          <li>Client XYZ - Pending 12 hrs</li>
          <li>Candidate John - Interview rescheduled</li>
          <li>Deal ABC Inc - High Value</li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="add-lead" onClick={() => setShowAddLeadModal(true)}>
          + Add Lead
        </button>
        {/* <button className="add-candidate">+ Add Candidate</button> */}
        <button className="add-candidate">+ Add Candidate</button>
        <button className="view-reports">📊 View Reports</button>
      </div>

      {showAddLeadModal && (
        <AddLeadModal
          onClose={() => setShowAddLeadModal(false)}
          onSubmit={handleSubmitLead}
        />
      )}

      {/* Footer */}
      <div className="header-footer">
        <p>All Rights Reserved. DNCS Global 2020.</p>
      </div>
    </div>
  );
}
