import { useParams, useRevalidator } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiLockAlt } from 'react-icons/bi';
import { MdLockOutline } from 'react-icons/md';
import jwt_decode from 'jwt-decode';
import { FaRecycle } from 'react-icons/fa';
import { FaLightbulb } from 'react-icons/fa';

const Recycle = () => {
  const params = useParams();
  const [can, setCan] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    axios.get(`/cans/${params.id}`).then((res) => {
      setCan(res.data);
    });
  }, []);

  useEffect(() => {
    if (!authenticated && localStorage.recycleToken) {
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
      setIsBusy(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/cans/validate/${params.id}`, {
        password,
      });
      setSuccess(res.data.message);
      setError('');
      window.location.reload();
      const token = res.data.token;
      localStorage.setItem('recycleToken', token);
    } catch (err) {
      setError(err.response.data.message);
      setSuccess('');
    }
  };

  return (
    <div className="h-[91.5vh]">
      {authenticated ? (
        <div className="flex h-[100%] justify-center items-center">
          <div className="bg-white rounded-2xl shadow-2xl text-center w-[25%] max-w-[50%] py-5 px-12 text-gray-700">
            <div className="w-[100%] flex justify-center items-center mb-5 text-3xl">
              <h2>Recycle </h2>{' '}
              <FaRecycle className="my-1 mx-2 w-3xl text-green-500" />
            </div>
            <div className="text-gray-500">
              <p>
                Put the waste in the can and click "Calculate" to weight the
                recyclables.
              </p>
              <div className="text-blue-500 text-xs text-left mt-2 bg-blue-200 p-2 border-l-2 border-blue-500 flex">
                <FaLightbulb className="mt-[6px] mr-1" />
                <p className="my-1">
                  Can will close automatically in 2 minutes.
                </p>
              </div>
              {error && (
                <p className="text-red-500 text-xs text-left mt-2 bg-red-200 p-2 border-l-2 border-red-500">
                  {' '}
                  X {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 text-xs text-left mt-2 bg-green-200 p-2 border-l-2 border-green-500">
                  {' '}
                  ✓ {success}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-[80%] bg-green-500 text-white rounded-lg p-2 my-3 mt-6"
            >
              Calculate
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-[100%] justify-center items-center">
          <div className="bg-white rounded-2xl shadow-2xl text-center w-[25%] max-w-[50%] py-5 px-12 text-gray-700">
            <div className="w-[100%] flex justify-center items-center mb-5 text-3xl">
              <h2>Authenticate </h2> <BiLockAlt className="my-1 mx-2 w-3xl" />
            </div>
            <div className="text-gray-500">
              <p>Enter the password shown on the garbage can.</p>
              {error && (
                <p className="text-red-500 text-xs text-left mt-2 bg-red-200 p-2 border-l-2 border-red-500">
                  {' '}
                  X {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 text-xs text-left mt-2 bg-green-200 p-2 border-l-2 border-green-500">
                  {' '}
                  ✓ {success}
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-100 w-6/6 p-2 flex items-center my-5">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-inherit outline-none w-full text-gray-600"
                  value={password || ''}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-[80%] bg-green-500 text-white rounded-lg p-2 my-3 mt-6"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recycle;
