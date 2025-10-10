import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import PipelineConfig from './components/PipelineConfig';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    
      
        Data Pipeline Manager
      
      
        <PipelineConfig onCreated={() => setRefresh(r => r + 1)} />
        
      
    
  );
}

export default App;