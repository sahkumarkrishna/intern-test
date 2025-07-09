import { useEffect, useRef, useState } from "react";
import ChatInput from "./InputPanel";

const ChatWindow = ({ messages, onSend, currentChatName }) => {
  const bottomRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      <div className="px-4 py-3 border-b bg-white shadow-sm">
        <h2 className="text-lg font-semibold">{currentChatName}</h2>
      </div>

      {/* Scrollable messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap break-words shadow-md ${
                msg.sender === "user"
                  ? "bg-white-500 text-black rounded-br-none"
                  : "bg-white text-gray-800 border rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border text-gray-500 px-4 py-2 text-sm rounded-xl shadow-sm animate-pulse">
              Typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Chat input */}
      <div className="mt-auto px-4 py-3 bg-white border-t">
        <ChatInput
          onSend={(data) => {
            onSend(data);
            
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 1000);
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
