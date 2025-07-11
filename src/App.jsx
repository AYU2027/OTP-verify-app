// src/App.jsx
import React from 'react';
// Import the OtpVerification component
import OtpVerification from './componets/OtpVerification';
// Assuming your global Tailwind CSS directives are in index.css or App.css
// This import is still necessary for Tailwind to work
import './App.css'; // Or './index.css' if that's where your Tailwind imports are

function App() {
  return (
    // Render the OtpVerification component directly.
    // The OtpVerification component itself handles full-screen layout and centering.
    <OtpVerification />
  );
}

export default App;
