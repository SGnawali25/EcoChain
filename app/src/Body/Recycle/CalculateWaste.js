import jwt_decode from 'jwt-decode';
import { FaRecycle } from 'react-icons/fa';
import { FaLightbulb } from 'react-icons/fa';
import Countdown from 'react-countdown';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const CalculateWaste = ({ error, success, setError, setSuccess }) => {
  const [validated, setValidated] = useState(false);
  const [validationToken, setValidationToken] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  const getDate = () => {
    try {
      const date =
        Date.now() +
        (jwt_decode(localStorage.recycleToken).exp -
          Math.floor(Date.now() / 1000)) *
          1000;
      return date;
    } catch (err) {
      setError('Session expired. Please log in again.');
    }
  };

  const toFixed = (num, fixed) => {
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  };

  const handleCalculation = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        `/cans/calculate/${jwt_decode(localStorage.recycleToken).canId}`,
        {
          recycleToken: localStorage.recycleToken,
        }
      );
      setSuccess(
        `Calculated ${
          data.data.data
        } lbs of waste! You will be rewarded ${toFixed(
          data.data.data * 0.1,
          3
        )} EcoCoins. Do you want to recycle and continue with the transaction?`
      );
      setValidationToken(data.data.token);
      localStorage.setItem('validationToken', data.data.token);
      setValidated(true);
      setLoading(false);
    } catch (err) {
      setError('Session expired. Please log in again.');
    }
  };

  const handleValidation = async () => {
    try {
      setLoadingTransaction(true);
      const data = await axios.post(
        `/users/recycle/${jwt_decode(localStorage.recycleToken).canId}`,
        {
          recycleToken: localStorage.recycleToken,
          validationToken,
        }
      );
      setSuccess(data.data.message);
      console.log(data.data);
      setValidated(false);
      const waste = jwt_decode(localStorage.validationToken).waste;
      setLoadingTransaction(false);
      localStorage.removeItem('recycleToken');
      localStorage.removeItem('validationToken');
      navigate(`/success/${waste}`);
    } catch (err) {
      setError('Session expired. Please log in again.');
    }
  };

  return (
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
            <div className="my-1 flex">
              <p>Can will close automatically in&nbsp;</p>
              {
                <Countdown
                  date={getDate()}
                  renderer={(props) => (
                    <div>
                      {props.formatted.minutes}:{props.formatted.seconds}
                    </div>
                  )}
                  zeroPadTime={2}
                  onComplete={() => {
                    window.location.reload();
                  }}
                />
              }
            </div>
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

        {!validated && (
          <button
            type="submit"
            className="w-[80%] bg-green-500 text-white rounded-lg p-2 my-3 mt-6"
            onClick={handleCalculation}
          >
            {loading ? <PulseLoader color="#fff" size={6} /> : 'Calculate'}
          </button>
        )}
        {validated && (
          <button
            type="submit"
            className="w-[80%] bg-green-500 text-white rounded-lg p-2 my-3 mt-6"
            onClick={handleValidation}
          >
            {loadingTransaction ? (
              <PulseLoader color="#fff" size={6} />
            ) : (
              'Complete Transaction'
            )}
          </button>
        )}
        {validated && !loadingTransaction && (
          <button
            type="submit"
            className="w-[80%] bg-blue-500 text-white rounded-lg p-2"
            onClick={handleCalculation}
          >
            {loading ? <PulseLoader color="#fff" size={6} /> : 'Recalculate'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CalculateWaste;
