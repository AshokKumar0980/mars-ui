import React, { useState } from "react";
import "./dashboard.css";
import "./AddLeadModal.css";

export default function AddLeadModal({ onClose, onSubmit }) {
  const initialLeadData = {
    jobTitleId: '',
    location: '',
    jobType: '',
    workArrangement: '',
    description: '',
    experienceYears: '',
    education: '',
    educationOther: '',
    category: '',
    role: '',
    salaryType: '',
    salaryValue: '',
    visaStatus: ''
  };

  const [leadData, setLeadData] = useState(initialLeadData);
  const [wordCount, setWordCount] = useState(0);

  const countWords = (text) =>
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      const words = countWords(value);
      const max = 500;
      if (words <= max) {
        setLeadData((prev) => ({ ...prev, [name]: value }));
        setWordCount(words);
      } else {
        const trimmedText = value.split(/\s+/).slice(0, max).join(" ");
        setLeadData((prev) => ({ ...prev, [name]: trimmedText }));
        setWordCount(max);
      }
    } else {
      setLeadData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(leadData);
    setLeadData(initialLeadData);
    setWordCount(0);
  };

  return (
    <div className="add-lead-modal-overlay" onClick={onClose}>
      <div
        className="add-lead-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="add-lead-header">
          JOB QUEUE
          <button className="add-lead-close-button" onClick={onClose}>
            ×
          </button>
        </header>

        <form className="add-lead-form" onSubmit={handleSubmit}>
          <label>
            Job Title / Job ID: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="jobTitleId"
            value={leadData.jobTitleId}
            onChange={handleInputChange}
            required
          />

          <label>
            Job Location: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="City, State or Remote"
            value={leadData.location}
            onChange={handleInputChange}
            required
          />

          <label>
            Job Type: <span className="required">*</span>
          </label>
          <select
            name="jobType"
            value={leadData.jobType}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          <label>
            Work Mode: <span className="required">*</span>
          </label>
          <select
            name="workArrangement"
            value={leadData.workArrangement}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>

          <label>
            Job Description / Responsibilities (Max 500 words):{" "}
            <span className="required">*</span>
          </label>
          <textarea
            name="description"
            rows="4"
            value={leadData.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <div
            className={`word-counter ${
              wordCount > 500 * 0.9
                ? wordCount > 500
                  ? "error"
                  : "warning"
                : ""
            }`}
          >
            {wordCount > 500
              ? `500 / 500 words (max reached)`
              : `${wordCount} / 500 words`}
          </div>

          <label>
            Years of Experience: <span className="required">*</span>
          </label>
          <input
            type="number"
            name="experienceYears"
            min="0"
            step="0.5"
            placeholder="e.g. 3 or 4.5"
            value={leadData.experienceYears}
            onChange={handleInputChange}
            required
          />

          <label>
            Education Level: <span className="required">*</span>
          </label>
          <select
            name="education"
            value={leadData.education}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Education --</option>
            <option value="Bachelor">Bachelor's</option>
            <option value="Master">Master's</option>
            <option value="Other">Other's</option>
          </select>

          {leadData.education === "Other" && (
            <div style={{ marginTop: "8px" }}>
              <label>
                Please specify: <span className="required">*</span>
              </label>
              <input
                type="text"
                name="educationOther"
                placeholder="Please specify"
                value={leadData.educationOther}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <label>
            Job Industry: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="category"
            value={leadData.category}
            onChange={handleInputChange}
            required
          />

          <label>
            Role: <span className="required">*</span>
          </label>
          <select
            name="role"
            value={leadData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Role --</option>
            <option value="Full Time">Full Time</option>
            <option value="C2C">C2C</option>
            <option value="W2">W2</option>
            <option value="C2H">C2H</option>
          </select>

          <label>
  Expected Salary Range: <span className="required">*</span>
</label>
<select
  name="salaryValue"
  value={leadData.salaryValue}
  onChange={handleInputChange}
  required
>
  <option value="">-- Select Salary Range --</option>
  <option value="0-10000">0 - 10K</option>
  <option value="10000-50000">10K - 50K</option>
  <option value="50000-100000">50K - 100K</option>
  <option value="100000-200000">100K - 200K</option>
  <option value="200000-300000">200K - 300K</option>
  <option value="300000+">300K +</option>
</select>

          {leadData.salaryType && (
            <input
              type="text"
              name="salaryValue"
              placeholder={
                leadData.salaryType === "hourly"
                  ? "e.g. $40–$50"
                  : leadData.salaryType === "monthly"
                  ? "e.g. $5,000–$6,000"
                  : "e.g. $60,000–$80,000"
              }
              value={leadData.salaryValue}
              onChange={handleInputChange}
              required
            />
          )}

          <label>
            Visa Status: <span className="required">*</span>
          </label>
          <select
            name="visaStatus"
            value={leadData.visaStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Visa Status --</option>
            <option value="OPT">OPT</option>
            <option value="H1">H1</option>
            <option value="Green Card">Green Card</option>
            <option value="Citizenship">Citizenship</option>
            <option value="H4-EAD">H4-EAD</option>
            <option value="Other">Other's</option>
          </select>

          {leadData.visaStatus === "Other" && (
            <div style={{ marginTop: "8px" }}>
              <label>
                Please specify: <span className="required">*</span>
              </label>
              <input
                type="text"
                name="visaStatusOther"
                placeholder="Please specify"
                value={leadData.visaStatusOther}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          

          <div className="submit-button-wrapper">
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
