import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState(["Chat 1"]);
  const [chatMessages, setChatMessages] = useState([[]]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);

  // Set sidebar open by default on desktop
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    setIsSidebarOpen(isDesktop);
  }, []);

  // Create a new chat thread
  const handleAddChat = () => {
    const newChatName = `Chat ${chats.length + 1}`;
    setChats((prev) => [...prev, newChatName]);
    setChatMessages((prev) => [...prev, []]);
    setCurrentChatIndex(chats.length);
  };

  // Add user & bot message to current chat
  const handleSend = (data) => {
    setChatMessages((prev) => {
      const updatedMessages = [...prev];
      const current = updatedMessages[currentChatIndex];
      updatedMessages[currentChatIndex] = [
        ...current,
        { sender: "user", ...data },
        { sender: "bot", text: `You said: ${data.text}` },
      ];
      return updatedMessages;
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleAddChat={handleAddChat}
      />

      {/* Sidebar + Chat Window */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          chats={chats}
          handleAddChat={handleAddChat}
          setCurrentChatIndex={setCurrentChatIndex}
        />

        <main className="flex-1 flex flex-col">
          <ChatWindow
            messages={chatMessages[currentChatIndex]}
            onSend={handleSend}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
