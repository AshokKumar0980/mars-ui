import React from "react";

export default function Rejected() {
  return (
    <div>
      <h1>Rejected Candidates</h1>
      <table>
        <thead>
          <tr><th>Name</th><th>Reason</th></tr>
        </thead>
        <tbody>
          <tr><td>Mark Henry</td><td>Lack of experience</td></tr>
        </tbody>
      </table>
    </div>
  );
}
