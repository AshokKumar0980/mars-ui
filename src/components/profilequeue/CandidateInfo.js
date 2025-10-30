import React from "react";

export default function CandidateInfo() {
  return (
    <div className="rows">
      <h1>Candidate Info</h1>
      <table>
        <thead>
          <tr><th>Name</th><th>Technology</th><th>Requirement</th><th>Vendor</th><th>Client</th><th>Rate</th></tr>
        </thead>
        <tbody>
          <tr><td>John Doe</td><td>Java</td><td>Backend Dev</td><td>ABC Vendor</td><td>XYZ Corp</td><td>$50/hr</td></tr>
        </tbody>
      </table>
    </div>
  );
}
