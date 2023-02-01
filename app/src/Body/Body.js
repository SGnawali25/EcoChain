import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login/Login';
import Signup from './Login/Signup';
import NotFound from './NotFound';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Logout from './Logout';

const Body = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (
      localStorage.token &&
      jwt_decode(localStorage.token).exp * 1000 > Date.now()
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div className="Body">
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <LandingPage /> : <Login />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={isLoggedIn ? <LandingPage /> : <Signup />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Body;
