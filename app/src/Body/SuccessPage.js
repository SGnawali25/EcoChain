import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ECLogo from '../assets/ecochain.png';
import Success from '../assets/success.png';

const SuccessPage = () => {
  const toFixed = (num, fixed) => {
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
  };
  const params = useParams();
  return (
    <section className="items-center h-[91.5vh] p-16 dark:text-gray-900 pt-0">
      <div className="container flex-col items-center justify-self-center px-5 mx-auto my-8">
        <img
          src={Success}
          alt="Success"
          className="h-[50vh] rounded-full flex-1 mx-auto my-12 "
        />

        <div className="max-w-md text-center flex-1 mx-auto">
          {/* <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-800">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              {' '}
              <circle
                class="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />{' ' }
              <path
                class="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </h2> */}
          <p className="text-2xl font-semibold md:text-3xl text-gray-600">
            You recycled {params.amount} lbs of waste!
          </p>
          <p className="mt-4 mb-8 text-green-500 font-bold flex items-center justify-center">
            +{toFixed(params.amount * 0.1, 3)}
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
