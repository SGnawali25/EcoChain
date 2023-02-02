import React from 'react';
import Navbar from './Header/Navbar';
import Body from './Body/Body';
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.token}`;

  return (
    <div className="App bg-green-50">
      <Navbar />
      <Body />
    </div>
  );
};

export default App;
