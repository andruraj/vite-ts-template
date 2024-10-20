import { isAuthenticated } from "@auth/auth.slice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isAuth = useSelector(isAuthenticated);

  return isAuth ? (
    <div className="w-full p-4 shadow shadow-black flex items-center justify-between">
      <div id="brand-logo">Logo</div>
      <div className="flex items-center gap-2">
        <div id="item1"></div>
        <div id="item2"></div>
        <div id="item3"></div>
      </div>
      <div id="user" className="flex items-center gap-2">
        <div id="user">Username</div>
        <div id="logout">Logout</div>
      </div>
    </div>
  ) : (
    <div className="w-full p-4 shadow shadow-black">
      <div id="brand-logo">Logo</div>
    </div>
  );
};

export default Navbar;
