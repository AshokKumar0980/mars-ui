import React, { useState } from "react";

export default function Sidebar({ setSection, setQueueType }) {
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [jobQueueOpen, setJobQueueOpen] = useState(false);

  const submenuClass =
    "block py-1 px-3 rounded hover:bg-[#01040c] cursor-pointer font-normal";
  const parentClass =
    "flex justify-between items-center py-1.5 px-3 rounded hover:bg-[#01040c] cursor-pointer font-semibold";

  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-[#e88c41] text-white p-4">
      <h2 className="text-center text-xl font-bold mb-4 text-[#9B2226]">MARS</h2>

      {/* Dashboard */}
      <a
        className="block py-1.5 px-3 rounded hover:bg-[#01040c] cursor-pointer"
        onClick={() => setSection("dashboard")}
      >
        Dashboard
      </a>

      {/* Job Queue */}
      <div className="mt-2">
        <div
          className={parentClass}
          onClick={() => setJobQueueOpen(!jobQueueOpen)}
        >
          <span>Job Queue</span>
          <span>{jobQueueOpen ? "▲" : "▼"}</span>
        </div>

        {jobQueueOpen && (
          <div className="ml-4 mt-1">
            <a
              className={submenuClass}
              onClick={() => {
                setQueueType("global");
                setSection("jobQueue");
              }}
            >
              Global Queue
            </a>
            <a
              className={submenuClass}
              onClick={() => {
                setQueueType("personal");
                setSection("jobQueue");
              }}
            >
              Personal Queue
            </a>
            <a
              className={submenuClass}
              onClick={() => {
                setQueueType("wip");
                setSection("jobQueue");
              }}
            >
              WIP Queue
            </a>
            <a
              className={submenuClass}
              onClick={() => {
                setQueueType("escalation");
                setSection("jobQueue");
              }}
            >
              Escalation Queue
            </a>
            <a
              className={submenuClass}
              onClick={() => {
                setQueueType("failed");
                setSection("jobQueue");
              }}
            >
              Failed Queue
            </a>
            <a
              className={submenuClass}
              onClick={() => {
                setQueueType("completed");
                setSection("jobQueue");
              }}
            >
              Completed Queue
            </a>

            {/* ✅ Total On Hold submenu */}
            <a
              className={submenuClass}
              onClick={() => {
                setQueueType("onHold");
                setSection("jobQueue");
              }}
            >
              Total On Hold
            </a>
          </div>
        )}
      </div>

      {/* ✅ Profile Queue with new submenu */}
      <div className="mt-3">
        <div
          className={parentClass}
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <span>Profile Queue</span>
          <span>{profileOpen ? "▲" : "▼"}</span>
        </div>

        {profileOpen && (
          <div className="ml-4 mt-1">
            
          
            <a
              className={submenuClass}
              onClick={() => setSection("addLead")} 
            >
              Add Lead
            </a>

            <a
              className={submenuClass}
              onClick={() => setSection("addCandidate")}
            >
              Add Candidate
            </a>
            <a
              className={submenuClass}
              onClick={() => setSection("searchLeads")}
            >
              Search Leads
            </a>
            <a
              className={submenuClass}
              onClick={() => setSection("searchCandidates")}
            >
              Search Candidates
            </a>
          </div>
        )}
      </div>

      {/* Tracking */}
      <div className="mt-3">
        <div
          className={parentClass}
          onClick={() => setTrackingOpen(!trackingOpen)}
        >
          <span>Tracking</span>
          <span>{trackingOpen ? "▲" : "▼"}</span>
        </div>

        {trackingOpen && (
          <div className="ml-4 mt-1">
            <a
              className={submenuClass}
              onClick={() => setSection("interviewSubmitted")}
            >
              Resume Tracking Task
            </a>
            <a
              className={submenuClass}
              onClick={() => setSection("interviewNotSubmitted")}
            >
              Ready for Review Task
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
