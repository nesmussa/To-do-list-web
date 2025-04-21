import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Assuming your main component is App.jsx
import './index.css'; // Your global CSS
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import routing components

// Import your components
import Home from './Pages/home/Home.jsx';
import Addtask from './Pages/Addtask/Addtask.jsx';
import Update from './Pages/Update/Update.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your application with BrowserRouter */}
    <BrowserRouter>
      {/* Define your routes inside Routes */}
      <Routes>
        {/* Route for the Home page */}
        <Route path="/" element={<Home />} />

        {/* Route for adding a task */}
        <Route path="/addtask" element={<Addtask />} />

        {/* Route for updating a task, with a dynamic ID parameter */}
        <Route path="/update/:taskId" element={<Update />} />

        {/* You can add a 404 Not Found route here as well */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);