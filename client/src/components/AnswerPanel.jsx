import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";

const AnswerPanel = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const handleSend = (data) => {
    const userMsg = { sender: "user", ...data };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    
    setTimeout(() => {
      const botMsg = {
        sender: "bot",
        text: `Thanks for your message: "${data.text}"`,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000); 
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
     
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-xl text-sm whitespace-pre-wrap break-words shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 border rounded-bl-none"
              }`}
            >
              {msg.text}

              {msg.image && (
                <img
                  src={msg.image}
                  alt="preview"
                  className="mt-2 max-h-40 rounded-lg border"
                />
              )}

              {msg.fileName && (
                <p className="text-xs mt-1 text-gray-500">📎 {msg.fileName}</p>
              )}
            </div>
          </div>
        ))}

        {/* Bot typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border text-gray-500 px-4 py-2 text-sm rounded-xl shadow-sm animate-pulse">
              Bot is typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Chat input */}
      <div className="p-4 border-t bg-white">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default AnswerPanel;
