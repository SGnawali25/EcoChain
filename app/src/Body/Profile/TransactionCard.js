import ECLogo from '../../assets/ecochain.png';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { BiMap } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';

const TransactionCard = ({ transaction }) => {
  const [city, setCity] = useState('');

  useEffect(() => {
    axios.get(`/cans/${transaction.garbageCan}`).then((res) => {
      const reqUrl = `https://nominatim.openstreetmap.org/reverse?lat=${
        res.data.coordinates.split(',')[0]
      }&lon=${res.data.coordinates.split(',')[1].trim()}&zoom=10&format=json`;
      console.log(reqUrl);
      axios.get(reqUrl).then((res) => {
        setCity(res.data.address.city);
      });
    });
  });

  return !city ? (
    <div className="flex align-center text-center justify-center py-6 ">
      <PulseLoader color="#22c55e" size="10" />
    </div>
  ) : (
    <div className="transaction-card flex justify-between text-center align-center my-5 py-2 text-gray-600 px-5 mx-0 border-b-2 border-neutral-200">
      <div className="flex justify-center items-center">
        <BsFillCalendarDateFill className="text-md mt-1" />
        <p className="text-md ml-1 font-semibold mt-1">
          {new Date(transaction.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <BiMap className="text-md mt-1" />
        <p className="text-md ml-1 font-semibold mt-1">{city}</p>
      </div>
      <div className="flex align-end items-center">
        <p className="text-md mt-1 text-green-500 font-bold">
          +{transaction.coinsAwarded}
        </p>
        <img src={ECLogo} alt="EcoChain Logo" className="w-7 m-0" />
      </div>
    </div>
  );
};

export default TransactionCard;
