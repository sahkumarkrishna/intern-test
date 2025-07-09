const MessageBubble = ({ sender, text, image }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex my-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-xl shadow 
        ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{text}</p>
        {image && (
          <img
            src={image}
            alt="attachment"
            className="mt-2 max-h-40 rounded-lg border"
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
