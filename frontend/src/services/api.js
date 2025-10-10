import axios from 'axios';

const API_BASE = '/api/pipelines';

export const pipelineApi = {
  getAll: () => axios.get(API_BASE),
  getById: (id) => axios.get(`${API_BASE}/${id}`),
  create: (data) => axios.post(API_BASE, data),
  update: (id, data) => axios.put(`${API_BASE}/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/${id}`),
  execute: (id) => axios.post(`${API_BASE}/${id}/execute`)
};