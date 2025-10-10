import React, { useState } from 'react';
import { pipelineApi } from '../services/api';
import './PipelineConfig.css';

export default function PipelineConfig({ onCreated }) {
  const [formData, setFormData] = useState({
    source: '',
    destination: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pipelineApi.create(formData);
      setFormData({ source: '', destination: '' });
      if (onCreated) onCreated();
    } catch (error) {
      console.error('Error creating pipeline:', error);
      alert('Failed to create pipeline');
    }
  };

  return (
    <div className="pipeline-config">
      <h2>Create New Pipeline</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Source: </label>
          <input
            type="text"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Destination: </label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            required
          />
        </div>
        <button type="submit">Create Pipeline</button>
      </form>
    </div>
  );
}