import React, { useEffect, useState } from "react";

const WipQueue = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/jobqueue/wip")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching wip queue", err));
  }, []);

  return (
    <div>
      <h3>WIP Queue</h3>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Candidate</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, idx) => (
            <tr key={idx}>
              <td>{job.jobId}</td>
              <td>{job.candidate}</td>
              <td>{job.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WipQueue;
