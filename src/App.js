import React from 'react';
import { Dashboard, Login, PrivateRoute,  Files, Users, Error, Register } from './pages';
import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        } /> */}
        <Route path='/login' element={<Register/>} />
        <Route path='/files' element={<Files/>} />
        <Route path='/users' element={<Users/>} />
        <Route  path='/' element={<Dashboard/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </Router>
  );
}

export default App;
