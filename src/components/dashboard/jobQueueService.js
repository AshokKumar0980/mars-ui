// jobQueueService.js
// This service layer abstracts storage - easy to switch from JSON to Digital Ocean
// FIXED: Removed localStorage - now uses in-memory storage or backend API

const STORAGE_TYPE = 'memory'; // Options: 'memory', 'backend', 'digitalocean'
const BACKEND_API_URL = '/api'; // Your backend API base URL

class JobQueueService {
  constructor() {
    this.storageType = STORAGE_TYPE;
    // In-memory storage (replaces localStorage)
    this.memoryStore = [];
  }

  // Save job queue - works with memory, backend API, and Digital Ocean
  async saveJobQueue(jobData) {
    switch (this.storageType) {
      case 'memory':
        return this.saveToMemory(jobData);
      case 'backend':
        return this.saveToBackend(jobData);
      case 'digitalocean':
        return this.saveToDigitalOcean(jobData);
      default:
        throw new Error(`Unknown storage type: ${this.storageType}`);
    }
  }

  // Get all job queues
  async getAllJobQueues() {
    switch (this.storageType) {
      case 'memory':
        return this.getFromMemory();
      case 'backend':
        return this.getFromBackend();
      case 'digitalocean':
        return this.getFromDigitalOcean();
      default:
        throw new Error(`Unknown storage type: ${this.storageType}`);
    }
  }

  // Get single job queue by ID
  async getJobQueueById(jobId) {
    const allJobs = await this.getAllJobQueues();
    return allJobs.find(job => job.id === jobId);
  }

  // Delete job queue
  async deleteJobQueue(jobId) {
    if (this.storageType === 'memory') {
      this.memoryStore = this.memoryStore.filter(job => job.id !== jobId);
      return { success: true, message: 'Job deleted successfully' };
    } else if (this.storageType === 'backend') {
      return this.deleteFromBackend(jobId);
    } else if (this.storageType === 'digitalocean') {
      return this.deleteFromDigitalOcean(jobId);
    }
  }

  // Update job queue
  async updateJobQueue(jobId, updates) {
    if (this.storageType === 'memory') {
      const index = this.memoryStore.findIndex(job => job.id === jobId);
      if (index !== -1) {
        this.memoryStore[index] = { ...this.memoryStore[index], ...updates };
        return { success: true, message: 'Job updated successfully' };
      }
      return { success: false, message: 'Job not found' };
    } else if (this.storageType === 'backend') {
      return this.updateInBackend(jobId, updates);
    } else if (this.storageType === 'digitalocean') {
      return this.updateInDigitalOcean(jobId, updates);
    }
  }

  // ============================================
  // IN-MEMORY STORAGE (for development/testing)
  // ============================================
  async saveToMemory(jobData) {
    try {
      // Ensure job has an ID
      if (!jobData.id) {
        jobData.id = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Add timestamp
      jobData.createdAt = jobData.createdAt || new Date().toISOString();
      
      this.memoryStore.push(jobData);
      
      return {
        success: true,
        message: 'Job queue saved successfully!',
        jobId: jobData.id,
        data: jobData
      };
    } catch (error) {
      console.error('Error saving to memory:', error);
      return {
        success: false,
        message: 'Failed to save job queue',
        error: error.message
      };
    }
  }

  async getFromMemory() {
    return [...this.memoryStore]; // Return copy to prevent external mutations
  }

  // ============================================
  // BACKEND API (for production JSON storage)
  // ============================================
  async saveToBackend(jobData) {
    try {
      const response = await fetch(`${BACKEND_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          message: 'Job queue saved successfully!',
          jobId: result.id || result.jobId,
          data: result
        };
      } else {
        throw new Error(result.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving to backend:', error);
      return {
        success: false,
        message: 'Failed to save job queue',
        error: error.message
      };
    }
  }

  async getFromBackend() {
    try {
      const response = await fetch(`${BACKEND_API_URL}/jobs`);
      
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : data.jobs || [];
      }
      return [];
    } catch (error) {
      console.error('Error reading from backend:', error);
      return [];
    }
  }

  async deleteFromBackend(jobId) {
    try {
      const response = await fetch(`${BACKEND_API_URL}/jobs/${jobId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        return { success: true, message: 'Job deleted successfully' };
      }
      throw new Error('Failed to delete job');
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateInBackend(jobId, updates) {
    try {
      const response = await fetch(`${BACKEND_API_URL}/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (response.ok) {
        return { success: true, message: 'Job updated successfully' };
      }
      throw new Error('Failed to update job');
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // ============================================
  // DIGITAL OCEAN SPACES/API
  // ============================================
  async saveToDigitalOcean(jobData) {
    try {
      const response = await fetch('YOUR_DIGITALOCEAN_API_ENDPOINT/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify(jobData)
      });

      const result = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          message: 'Job queue saved successfully!',
          jobId: result.id,
          data: result
        };
      } else {
        throw new Error(result.message || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving to Digital Ocean:', error);
      return {
        success: false,
        message: 'Failed to save job queue',
        error: error.message
      };
    }
  }

  async getFromDigitalOcean() {
    try {
      const response = await fetch('YOUR_DIGITALOCEAN_API_ENDPOINT/jobs', {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : data.jobs || [];
      }
      return [];
    } catch (error) {
      console.error('Error reading from Digital Ocean:', error);
      return [];
    }
  }

  async deleteFromDigitalOcean(jobId) {
    try {
      const response = await fetch(`YOUR_DIGITALOCEAN_API_ENDPOINT/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      });
      
      if (response.ok) {
        return { success: true, message: 'Job deleted successfully' };
      }
      throw new Error('Failed to delete job');
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateInDigitalOcean(jobId, updates) {
    try {
      const response = await fetch(`YOUR_DIGITALOCEAN_API_ENDPOINT/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify(updates)
      });
      
      if (response.ok) {
        return { success: true, message: 'Job updated successfully' };
      }
      throw new Error('Failed to update job');
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
export default new JobQueueService();