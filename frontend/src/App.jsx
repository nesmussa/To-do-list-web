import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home/Home.jsx';
import Addtask from './Pages/Addtask/Addtask.jsx';
import Update from './Pages/Update/Update.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtask" element={<Addtask />} />
        <Route path="/update/:taskId" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
