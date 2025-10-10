import React, { useState } from 'react';
import { pipelineApi } from '../services/api';

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
      onCreated();
    } catch (error) {
      console.error('Error creating pipeline:', error);
    }
  };

  return (
    
      Create New Pipeline
      
        
          Source: 
          <input
            type="text"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            required
          />
        
        
          Destination: 
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            required
          />
        
        Create Pipeline
      
    
  );
}