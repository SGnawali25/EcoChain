import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CalculateWaste from './CalculateWaste';
import Authenticate from './Authentication';

const Recycle = () => {
  const params = useParams();
  const [can, setCan] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get(`/cans/${params.id}`).then((res) => {
      setCan(res.data);
    });
  }, []);

  useEffect(() => {
    if (!authenticated && localStorage.recycleToken) {
      try {
        const { userId, canId, exp } = jwt_decode(localStorage.recycleToken);
        const loggedInUser = jwt_decode(localStorage.token);
        if (
          userId === loggedInUser.id &&
          canId === params.id &&
          exp * 1000 > Date.now()
        ) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        setAuthenticated(false);
        setError('Session expired. Please log in again.');
        return;
      }
    }
  }, []);

  return (
    <div className="h-[91.5vh]">
      {authenticated ? (
        <CalculateWaste
          success={success}
          error={error}
          setError={setError}
          setSuccess={setSuccess}
        />
      ) : (
        <Authenticate
          error={error}
          setError={setError}
          setSuccess={setSuccess}
        />
      )}
    </div>
  );
};

export default Recycle;
