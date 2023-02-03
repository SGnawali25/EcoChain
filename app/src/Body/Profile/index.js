import { useState, useEffect } from 'react';
import axios from 'axios';
import ECLogo from '../../assets/ecochain.png';
import TransactionCard from './TransactionCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    axios.get('users/profile').then((res) => {
      setUser(res.data);
      setIsBusy(false);
    });
  }, []);

  return (
    !isBusy && (
      <div className="py-[7vh] h-[91.5vh] ">
        <div className="relative max-w-350px w-[30%] bg-white bg-no-repeat bg-top rounded-2xl shadow-2xl mx-auto">
          <div className="flex flex-col items-center justify-center mt-22 bg-green-500 py-5 rounded-t-2xl border-b-2 border-neutral">
            <img
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.username}`}
              alt="Profile"
              className="rounded-full border-4 bg-white border-white w-[100px] h-[100px]"
            />
            <h1 className="font-bold text-gray-50 mt-5 mb-1 font-poppins text-2xl">
              {user.username}
            </h1>
          </div>
          <div className="flex justify-evenly mt-6 py-6 pt-0 border-b-2 border-neutral">
            <div className="text-center">
              <h3 className="font-bold text-secondary">
                {user.totalWasteRecycled}
              </h3>
              <p className="text-xs text-text tracking-widest">lbs Recycled</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-secondary">
                {user.totalCoinsEarned}
              </h3>
              <p className="text-xs text-text tracking-widest">
                EcoCoins Earned
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-secondary">
                {user.balance}
                <img
                  src={ECLogo}
                  alt="ecocoin"
                  className="w-5 h-5 inline-block"
                />
              </h3>
              <p className="text-xs text-text tracking-widest ">Balance</p>
            </div>
          </div>
          <div className="py-5">
            {user.transactions.length > 0 && (
              <h1 className="text-center text-2xl font-bold text-text">
                Recent Transactions
              </h1>
            )}
            {user.transactions.length > 0 ? (
              user.transactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center my-10">
                <h1 className="text-2xl font-bold text-center text-gray-600">
                  No Transactions Yet
                </h1>
              </div>
            )}
          </div>
          {/* <div className="flex justify-evenly mt-6 py-6 pt-0">
            <div className="text-center">
              <h3 className="font-bold text-secondary">
                {user.totalWasteRecycled}
              </h3>
              <p className="text-xs text-text tracking-widest">lbs Recycled</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-secondary">
                {user.totalCoinsEarned}
              </h3>
              <p className="text-xs text-text tracking-widest">
                EcoCoins Earned
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-secondary">{user.balance}</h3>
              <p className="text-xs text-text tracking-widest">Balance</p>
            </div>
          </div> */}
        </div>
      </div>
    )
  );
};

export default Profile;
