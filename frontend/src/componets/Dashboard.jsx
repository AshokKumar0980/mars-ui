import React, { useState, useEffect } from 'react';
import { pipelineApi } from '../services/api';

export default function Dashboard() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPipelines();
  }, []);

  const fetchPipelines = async () => {
    setLoading(true);
    try {
      const response = await pipelineApi.getAll();
      setPipelines(response.data);
    } catch (error) {
      console.error('Error fetching pipelines:', error);
    }
    setLoading(false);
  };

  const handleExecute = async (id) => {
    try {
      await pipelineApi.execute(id);
      fetchPipelines();
    } catch (error) {
      console.error('Error executing pipeline:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await pipelineApi.delete(id);
      fetchPipelines();
    } catch (error) {
      console.error('Error deleting pipeline:', error);
    }
  };

  return (
    
      Data Pipeline Dashboard
      {loading ? (
        Loading...
      ) : (
        
          
            
              ID
              Source
              Destination
              Status
              Actions
            
          
          
            {pipelines.map((pipeline) => (
              
                {pipeline.id}
                {pipeline.source}
                {pipeline.destination}
                {pipeline.status}
                
                  <button onClick={() => handleExecute(pipeline.id)}>Execute
                  <button onClick={() => handleDelete(pipeline.id)}>Delete
                
              
            ))}
          
        
      )}
    
  );
}