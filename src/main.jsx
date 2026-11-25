import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AcademicDataProvider } from './context/AcademicDataContext';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AcademicDataProvider>
          <App />
        </AcademicDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
