import Logo from "./Logo";
import { BiPhone } from "react-icons/bi";

function Nav() {
  return (
    <div className="w-full px-4">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <Logo />
        <a
          href="#"
          // target="_blank"
          className="border border-[#00549c] px-4 py-2 rounded-md text-[#00549c] hover:bg-[#00549c] hover:text-white transition duration-300 ease-in-out"
        >
          Get In Touch
        </a>
      </div>
    </div>
  );
}

export default Nav;
