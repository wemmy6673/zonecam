import Header from "./Header";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import Splash from "./Splash";

const LandingPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBox = (e) => {
    setIsChecked(e.target.checked);
  };

  if (showSplash) {
    return <Splash />;
  }

  return (
    <div className="w-full min-h-screen pt-[10vh]">
      <div className="w-full">
        <Header />

        <div className="flex pb-10 px-8 md:px-20 md:space-x-20">
          {/* <div className='w-full md:w-2/4'>

                    <img src={Nigerians} alt="Nigerians" className='rounded-lg' />

                </div> */}

          <div className="flex flex-col space-y-4 md:w-1/3 md:mx-auto">
            <h1 className="text-green-600 text-md font-bold text-center lg:text-left">
              Terms of service
            </h1>
            <p className="text-gray-600 text-justify font-light text-md">
              By accessing ZoneCam, you consent to the collection and use of
              images for the purpose of predicting geopolitical zones. We
              prioritize data security but cannot guarantee absolute protection.
              The data collected will be used for research and app improvement
              and will not be sold or shared without your consent, except as
              required by law. You agree not to use ZoneCam for unlawful
              activities, including uploading images without consent. All app
              content and features are exclusive property and are protected by
              intellectual property laws.
            </p>

            <div className="flex flex-row space-x-3">
              <input
                type="checkbox"
                checked={isChecked}
                id="terms"
                onChange={handleCheckBox}
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                Agree to terms and conditions
              </label>
            </div>

            <Link to="/register" disabled={!isChecked}>
              <button
                className={`${
                  isChecked
                    ? "bg-green-600 text-white rounded-md py-3 px-3 w-full"
                    : "text-white rounded-md py-3 px-3 w-full disabled:bg-green-300 disabled:cursor-not-allowed"
                }`}
                disabled={!isChecked}
              >
                Agree & Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
