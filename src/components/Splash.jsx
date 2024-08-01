import Logo from "../assets/images/logo.png";

const Splash = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="flex flex-col  md:px-0  items-center w-[100%] space-y-8 ">
        <img src={Logo} className="w-[100px] " />

        <div className="flex flex-col space-y-4 md:space-y-4">
          <p className="font-medium text-center text-green-600 text-base">
            Discover your roots...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
