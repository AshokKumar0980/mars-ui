import React from "react";

export default function ReadyForReviewTask() {
  // Dummy data array
  const tasks = [
    { id: 1, name: "John Doe", position: "Software Engineer", status: "Pending Review" },
    { id: 2, name: "Jane Smith", position: "Data Analyst", status: "Pending Review" },
    { id: 3, name: "Alice Johnson", position: "UX Designer", status: "Pending Review" },
    { id: 4, name: "Bob Brown", position: "DevOps Engineer", status: "Pending Review" },
  ];

  return (
    <div className="main-content p-4">
      <h1 className="text-2xl font-bold mb-4">Ready for Review Tasks</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-orange-500">
            <th className="py-2 px-4 border text-black">ID</th>
            <th className="py-2 px-4 border text-black">Name</th>
            <th className="py-2 px-4 border text-black">Position</th>
            <th className="py-2 px-4 border text-black">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="text-center">
              <td className="py-2 px-4 border">{task.id}</td>
              <td className="py-2 px-4 border">{task.name}</td>
              <td className="py-2 px-4 border">{task.position}</td>
              <td className="py-2 px-4 border">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
