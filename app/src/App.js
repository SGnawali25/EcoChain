import React from 'react';
import LandingPage from './Body/LandingPage';
import Navbar from './Header/Navbar';

const App = () => {
  return (
    <div className="App bg-green-50">
      <Navbar />
      <LandingPage />
    </div>
  );
};

export default App;
