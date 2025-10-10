import React, { useState, useEffect } from 'react';
import { pipelineApi } from '../services/api';
import './Dashboard.css';

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
    if (!window.confirm('Are you sure you want to delete this pipeline?')) return;
    try {
      await pipelineApi.delete(id);
      fetchPipelines();
    } catch (error) {
      console.error('Error deleting pipeline:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Data Pipeline Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pipelines.map((pipeline) => (
              <tr key={pipeline.id}>
                <td>{pipeline.id}</td>
                <td>{pipeline.source}</td>
                <td>{pipeline.destination}</td>
                <td>{pipeline.status}</td>
                <td>
                  <button onClick={() => handleExecute(pipeline.id)}>Execute</button>
                  <button onClick={() => handleDelete(pipeline.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}