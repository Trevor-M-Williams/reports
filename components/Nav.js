import Logo from "./Logo";
import { BiPhone } from "react-icons/bi";

function Nav() {
  return (
    <div className="w-full px-4">
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <Logo />
        <a
          href="tel:3035780518"
          className="flex items-center text-xl text-[#00549c]"
        >
          <BiPhone className="mr-2" />
          <p>303.578.0518</p>
        </a>
      </div>
    </div>
  );
}

export default Nav;
