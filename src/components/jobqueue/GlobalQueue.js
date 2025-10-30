import React, { useEffect, useState } from "react";
import axios from "axios";

const GlobalQueue = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://159.65.168.62:8080/api/jobqueue")
      .then((response) => {
        setJobs(response.data);
        console.log("requesting")
        setLoading(false);
      
        console.log(response,'123')
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch job data");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return { color: "green", fontWeight: "bold" };
      case "WORK_IN_PROGRESS":
      case "IN_PROGRESS":
        return { color: "blue", fontWeight: "bold" };
      case "CLOSED":
      case "COMPLETED":
        return { color: "gray", fontWeight: "bold" };
      case "ESCALATED":
        return { color: "red", fontWeight: "bold" };
      default:
        return { color: "black" };
    }
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="rows">
      <h3>Global Queue</h3>
      <div style={{ marginBottom: "20px", color: "#666" }}>
        Showing {jobs.length} jobs in global queue
      </div>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Employer ID</th>
            <th>Job Title</th>
            <th>Location</th>
            <th>Salary Range</th>
            <th>Visa Type</th>
            <th>Job Type</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job, idx) => (
              <tr key={idx}>
                <td>{job.jobId}</td>
                <td>{job.employerId}</td>
                <td>{job.jobTitle}</td>
                <td>{job.location}</td>
                <td>{job.salaryRange}</td>
                <td>{job.visaType}</td>
                <td>{job.jobType}</td>
                <td style={getStatusStyle(job.jobStatus)}>{job.jobStatus}</td>
                <td>{formatDate(job.createdAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", color: "#666" }}>
                No jobs available in global queue
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GlobalQueue;
