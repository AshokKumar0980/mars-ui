import React from "react";

const CompletedQueue = () => {
  return (
    <div>
      <h3>Completed Queue</h3>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Candidate</th>
            <th>Completed On</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>501</td>
            <td>Daniel Kim</td>
            <td>2025-08-10</td>
          </tr>
          <tr>
            <td>502</td>
            <td>Sara Ali</td>
            <td>2025-08-12</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompletedQueue;
