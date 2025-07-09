import React from 'react';
import { SchedulerProvider, useScheduler } from './context/SchedulerContext';
import Home from './pages/Home';
import Overview from './pages/Overview';

const AppContent = () => {
  const { viewMode } = useScheduler();

  return (
    <div className="min-h-screen bg-gray-50">
      {viewMode === 'calendar' ? <Home /> : <Overview />}
    </div>
  );
};

function App() {
  return (
    <SchedulerProvider>
      <AppContent />
    </SchedulerProvider>
  );
}

export default App;