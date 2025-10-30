import React from "react";

const FailedQueue = () => {
  return (
    <div>
      <h3>Failed Queue</h3>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Candidate</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>401</td>
            <td>Chris Wong</td>
            <td>Missing Documents</td>
          </tr>
          <tr>
            <td>402</td>
            <td>Emma Green</td>
            <td>Verification Failed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FailedQueue;
