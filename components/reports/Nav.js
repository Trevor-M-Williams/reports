import Logo from "./Logo";
import { BiPhone } from "react-icons/bi";

function Nav() {
  return (
    <div className="w-full px-4">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <Logo />
        <div className="flex items-center text-xl text-[#00549c]">
          <BiPhone className="mr-2" />
          <a href="tel:3035780518">303.578.0518</a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
