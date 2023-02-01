import { Link } from 'react-router-dom';
import LandingImage from '../assets/landing_page_image.svg';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const LandingPage = () => {
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
    <div className="flex flex-row h-[90vh] justify-between mx-10">
      <div className="flex flex-col justify-center">
        <h1 className="text-6xl font-bold mb-5 font-poppins text-green-500">
          EcoChain
        </h1>
        <p className="text-2xl font-medium font-poppins text-gray-500">
          A decentralized waste incentivization solution.
        </p>
        <div className="flex flex-row mt-5">
          <Link to={isLoggedIn ? '/recycle' : '/login'}>
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-5">
              Get Started
            </button>
          </Link>
          <button className="text-green-500 font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </div>
      <img src={LandingImage} alt="Landing page" className="w-[50%]" />
    </div>
  );
};

export default LandingPage;
