import { X } from "lucide-react";
import { BiEdit } from "react-icons/bi";

const Sidebar = ({
  isOpen,
  setIsSidebarOpen,
  chats,
  handleAddChat,
  setCurrentChatIndex,
}) => {
  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full z-40 w-[260px] bg-[#f9f9f9] border-r border-gray-200 p-4 transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
     
      <div className="md:hidden flex justify-end mb-2">
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-700 hover:text-black"
          title="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      
      <h1 className="text-xl font-semibold mb-4">Logo</h1>

     
      <button
        onClick={handleAddChat}
        className="w-full flex items-center gap-2 px-3 py-2 mb-4 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition"
      >
        <BiEdit className="w-5 h-5" />
        <span>New Chat</span>
      </button>

      {/* Chat List */}
      <ul className="space-y-2 overflow-y-auto max-h-[70vh] pr-1">
        {chats.map((chat, index) => (
          <li
            key={index}
            onClick={() => setCurrentChatIndex(index)}
            className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium transition"
            title={`Switch to ${chat}`}
          >
            {chat}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
