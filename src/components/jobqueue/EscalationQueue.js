import React from "react";

const EscalationQueue = () => {
  return (
    <div>
      <h3>Escalation Queue</h3>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Issue</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>301</td>
            <td>Verification Delay</td>
            <td>Team A</td>
          </tr>
          <tr>
            <td>302</td>
            <td>Data Mismatch</td>
            <td>Team B</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EscalationQueue;
