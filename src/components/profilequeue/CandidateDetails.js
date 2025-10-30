import React from "react";

export default function CandidateDetails() {
  return (
    <div className="rows">
      <h1>Candidate Details</h1>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone Number</th></tr>
        </thead>
        <tbody>
          <tr><td>John Doe</td><td>john@example.com</td><td>123-456-7890</td></tr>
        </tbody>
      </table>
    </div>
  );
}
