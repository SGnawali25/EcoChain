import ECLogo from '../../assets/ecochain.png';
import { FaRegUser, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, email, password };
    axios
      .post('/users/signup', user)
      .then((res) => {
        if (res.status.toString().startsWith('2')) {
          setError('');
          setSuccess(res.data.message);
          window.location.reload();
        } else {
          setSuccess('');
          setError(res.data.message);
        }
        const token = res.data.token;
        localStorage.setItem('token', token);
      })
      .catch((err) => {
        setSuccess('');
        console.log(err);
        setError(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[91.5vh] w-full flex-1 px-20 text-center bg-green-50">
      <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-3/5 p-5">
          <div className="text-left font-bold flex text-green-500">
            <img src={ECLogo} alt="EcoChain Logo" className="w-6 mr-1" />
            EcoChain
          </div>
          <div className="py-10 pb-5">
            <h2 className="text-3xl font-bold mb-2 text-green-500">
              Create Account
            </h2>
            <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
            {error && (
              <div class="alert flex flex-row items-center rounded px-5 py-2 w-3/5 m-auto mt-2">
                <div class="alert-icon flex items-center justify-center h-8 w-8 flex-shrink-0 rounded-full">
                  <span class="text-red-500">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      class="h-6 w-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div class="alert-content ml-2 flex">
                  <div class="alert-description text-sm text-red-600 ">
                    {error}
                  </div>
                </div>
              </div>
            )}
            {success && (
              <div class="alert flex flex-row items-center rounded px-5 py-2 w-3/5 m-auto mt-2">
                <div class="alert-icon flex items-center justify-center h-8 w-8 flex-shrink-0 rounded-full">
                  <span class="text-green-500">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      class="h-6 w-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div class="alert-content ml-4">
                  <div class="alert-description text-sm text-green-600">
                    {success}
                  </div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-3/6 p-2 flex items-center mb-3">
                <FaRegUser className="text-gray-400 m-2" />
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-inherit outline-none w-full text-gray-600"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="bg-gray-100 w-3/6 p-2 flex items-center mb-3">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-inherit outline-none w-full text-gray-600"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="bg-gray-100 w-3/6 p-2 flex items-center mb-3">
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
                className="border-2 text-green-500 border-green-500 rounded-full px-6 py-2 hover:bg-green-500 hover:text-white font-semibold mt-5"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="text-white w-2/5 py-36 px-12 bg-green-500 rounded-tr-2xl rounded-br-2xl">
          <h2 className="text-3xl font-bold mb-2">Sign In</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-6">
            Already have an account? Login to your account instead.
          </p>
          <Link to="/login">
            <button className="border-2 border-white rounded-full px-6 py-2 hover:bg-white hover:text-green-500 font-semibold">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
