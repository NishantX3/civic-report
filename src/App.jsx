import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import Dashboard from './pages/Dashboard';
import YourArea from './pages/YourArea';
import Profile from './pages/Profile';
import LoginModal from './pages/LoginModal';
import { LanguageProvider } from './context/LanguageContext';
import { LoginProvider } from './context/LoginContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <LoginProvider>
          <Router>
            <div className="min-h-screen bg-[#f9fafb] dark:bg-[#0b1120] text-gray-900 dark:text-slate-100 transition-colors duration-300">
              <Navbar onLoginClick={() => setIsLoginOpen(true)} />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/report" element={<ReportIssue />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/your-area" element={<YourArea />} />
              </Routes>

              <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
              />
            </div>
          </Router>
        </LoginProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
