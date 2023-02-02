import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ECLogo from '../assets/ecochain.png';

const SuccessPage = () => {
  const params = useParams();
  return (
    <section className="flex items-center h-[91.5vh] p-16 dark:text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 bg-white py-20 rounded-2xl shadow-2xl bg-opacity-100">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-800">
            Yay!
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            You recycled {params.amount} lbs of waste!
          </p>
          <p className="mt-4 mb-8 text-green-500 font-bold flex items-center justify-center">
            +{params.amount * 0.01}
            <img
              src={ECLogo}
              alt={'EcoChain Logo'}
              className="w-[5%] ml-1 border-[0.15rem] border-green-500 rounded-full p-0.25"
            />
          </p>

          <Link
            rel="noopener noreferrer"
            to="/"
            className="px-8 py-3 font-semibold rounded dark:bg-green-500 text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};
export default SuccessPage;
