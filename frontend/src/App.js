import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Tasks from './components/Tasks';

const App = () => {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth setAuth={setAuth} />} />
        <Route 
          path="/tasks" 
          element={auth ? <Tasks token={localStorage.getItem('token')} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<h1>Welcome to the Task Manager</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
