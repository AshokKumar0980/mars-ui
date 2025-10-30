import React from "react";

export default function ResumeTrackingTask() {
  // Dummy data array
  const submittedResumes = [
    { id: 1, name: "Michael Scott", position: "Regional Manager", date: "2025-09-01", status: "Submitted" },
    { id: 2, name: "Pam Beesly", position: "Receptionist", date: "2025-09-03", status: "Submitted" },
    { id: 3, name: "Jim Halpert", position: "Sales Representative", date: "2025-09-05", status: "Submitted" },
    { id: 4, name: "Dwight Schrute", position: "Assistant to the Regional Manager", date: "2025-09-07", status: "Submitted" },
  ];

  return (
    <div className="main-content p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Tracking Tasks</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-orange-500">
            <th className="py-2 px-4 border text-black">ID</th>
            <th className="py-2 px-4 border text-black">Name</th>
            <th className="py-2 px-4 border text-black">Position</th>
            <th className="py-2 px-4 border text-black">Submission Date</th>
            <th className="py-2 px-4 border text-black">Status</th>
          </tr>
        </thead>
        <tbody>
          {submittedResumes.map((resume) => (
            <tr key={resume.id} className="text-center">
              <td className="py-2 px-4 border">{resume.id}</td>
              <td className="py-2 px-4 border">{resume.name}</td>
              <td className="py-2 px-4 border">{resume.position}</td>
              <td className="py-2 px-4 border">{resume.date}</td>
              <td className="py-2 px-4 border">{resume.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
