import './App.css';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SchedulePickup from './components/SchedulePickup';
import ThankyouPage from './components/ThankyouPage';
import { ProjectSettingsProvider } from './ProjectSettingsContext';

function App() {

  return (
    <BrowserRouter>
      <ProjectSettingsProvider>
      <div className="App" style={{
        backgroundImage: 'url(https://lh3.googleusercontent.com/p/AF1QipPZ7Y-DFxLK7am9uHQf-Bv5B-yn0053w4C9omRZ=s680-w680-h510)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    width: "100vw",
    height: "100vh"}}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
          <Route path="/schedulePickup" element={<SchedulePickup />} />
          <Route path="/thankyou" element={<ThankyouPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
      </ProjectSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
