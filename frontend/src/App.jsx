import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import PipelineConfig from './components/PipeLineConfig';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="app">
      <header>
        <h1>Data Pipeline Manager</h1>
      </header>
      <main>
        <PipelineConfig onCreated={() => setRefresh(r => r + 1)} />
        <Dashboard key={refresh} />
      </main>
    </div>
  );
}

export default App;