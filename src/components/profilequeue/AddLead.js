import React, { useState, useEffect } from "react";

export default function AddLead() {
  const [formData, setFormData] = useState({
    jobTitleId: "",
    location: "",
    jobType: "",
    workArrangement: "",
    description: "",
    experienceYears: "",
    education: "",
    category: "",
    role: "",
    package: "",
    salaryRange: "",
    visaStatus: "",
  });

  const [jobQueueData, setJobQueueData] = useState([]);
  const [jobIdCounter, setJobIdCounter] = useState(1000);

  // Load from localStorage on mount
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("marsJobQueue")) || [];
    const storedCounter = parseInt(localStorage.getItem("marsJobIdCounter")) || 1000;
    setJobQueueData(storedJobs);
    setJobIdCounter(storedCounter);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newJobId = jobIdCounter + 1;
    const newJob = {
      id: newJobId,
      ...formData,
      createdDate: new Date().toISOString().split("T")[0],
      status: "Open",
      priority: "Medium",
      assignedTo: "Unassigned",
    };

    const updatedQueue = [...jobQueueData, newJob];

    // Save to localStorage
    localStorage.setItem("marsJobQueue", JSON.stringify(updatedQueue));
    localStorage.setItem("marsJobIdCounter", newJobId.toString());

    setJobQueueData(updatedQueue);
    setJobIdCounter(newJobId);

    alert(`Job submitted successfully!\nJob ID: ${newJob.id}\nTitle: ${newJob.jobTitleId}\nStatus: ${newJob.status}`);
    setFormData({
      jobTitleId: "",
      location: "",
      jobType: "",
      workArrangement: "",
      description: "",
      experienceYears: "",
      education: "",
      category: "",
      role: "",
      package: "",
      salaryRange: "",
      visaStatus: "",
    });

    const viewQueues = window.confirm("Would you like to view the job queues on the dashboard?");
    if (viewQueues) {
      sessionStorage.setItem("marsTargetSection", "globalQueue");
      window.location.href = "index.html"; // adjust path if needed
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Exo 2', 'Montserrat', sans-serif", background: "#f9f9f9" }}>
      <header
        style={{
          background: "#001f3f",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
          fontSize: "26px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        JOB QUEUE
      </header>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          maxWidth: "800px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        {/* Job Title / Job ID */}
        <label>Job Title / Job ID:</label>
        <input type="text" name="jobTitleId" value={formData.jobTitleId} onChange={handleChange} required />

        <label>Job Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City, State or Remote" required />

        <label>Job Type:</label>
        <select name="jobType" value={formData.jobType} onChange={handleChange} required>
          <option value="">-- Select Type --</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Work Mode:</label>
        <select name="workArrangement" value={formData.workArrangement} onChange={handleChange} required>
          <option value="">-- Select --</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>

        <label>Job Description / Responsibilities:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />

        <label>Years of Experience:</label>
        <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} min="0" placeholder="e.g. 3" />

        <label>Education Level:</label>
        <select name="education" value={formData.education} onChange={handleChange}>
          <option value="">-- Select Education --</option>
          <option value="Bachelor">Bachelor's</option>
          <option value="Master">Master's</option>
        </select>

        <label>Job Category / Industry:</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">-- Select Role --</option>
          <option value="Full Time">Full Time</option>
          <option value="C2C">C2C</option>
          <option value="W2">W2</option>
        </select>

        <label>Package:</label>
        <input type="number" name="package" value={formData.package} onChange={handleChange} placeholder="Enter package" required />

        <label>Salary Range (Optional):</label>
        <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleChange} placeholder="e.g. $60k–80k or $40–50/hr" />

        <label>Visa Status:</label>
        <select name="visaStatus" value={formData.visaStatus} onChange={handleChange} required>
          <option value="">-- Select Visa Status --</option>
          <option value="OPT">OPT</option>
          <option value="H1">H1</option>
          <option value="Green Card">Green Card</option>
          <option value="Citizenship">Citizenship</option>
          <option value="H4-EAD">H4-EAD</option>
        </select>

        <button type="submit">Submit Job</button>
      </form>
    </div>
  );
}
