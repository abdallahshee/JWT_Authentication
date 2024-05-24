import React from 'react';
import Register from './components/Register'


export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <h2>{localStorage.getItem('token')}</h2>
    <Register/>
  </div>
);
