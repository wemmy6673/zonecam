import Logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <div className="w-full py-6">
      <img src={Logo} alt="logo" className="mx-auto w-[100px]" />
    </div>
  );
};

export default Header;
