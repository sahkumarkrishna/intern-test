import { HiMenuAlt2 } from "react-icons/hi";
import { LuShare } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { BiEdit } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = ({ setIsSidebarOpen, handleAddChat }) => {
  return (
    <header className="w-full h-14 flex items-center justify-between px-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(true)}
          title="Open sidebar"
        >
          <HiMenuAlt2 className="w-6 h-6 text-gray-700" />
        </button>

        <div className="hidden md:flex items-center gap-1 font-medium">
          <span>ChatGPT</span>
          <IoIosArrowDown className="w-4 h-4 text-gray-500" />
        </div>

        <span className="md:hidden font-medium">Logo</span>
      </div>

      <div className="flex items-center gap-2">
        <BiEdit
          className="w-5 h-5 text-gray-600 cursor-pointer md:hidden"
          onClick={handleAddChat}
          title="New chat"
        />

        <div className="hidden md:flex items-center gap-2 mr-4">
          <LuShare className="w-5 h-5 cursor-pointer" title="Share" />
          <RxAvatar className="w-5 h-5 cursor-pointer" title="Profile" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
