import React from 'react';
import { Dashboard, Login, PrivateRoute, Register, Files, Users, Error } from './pages';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        } />
        <Route path='/users' element={
          <PrivateRoute>
            <Users/>
          </PrivateRoute>
        } />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </Router>
  );
}

export default App;
