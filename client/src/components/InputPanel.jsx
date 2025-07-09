import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Globe,
  Image as ImageIcon,
  Link as LinkIcon,
  Mic,
  Waves,
} from "lucide-react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const InputPanel = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    textareaRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [message]);

  // Voice input setup
  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setMessage((prev) => prev + " " + transcript);
    };

    recognition.onerror = (e) => {
      if (e.error === "not-allowed") {
        alert("Microphone permission denied.");
      } else {
        console.error("Speech Recognition Error:", e);
      }
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    onSend({
      text: message.trim(),
      fileName,
      image: imagePreview,
    });

    setMessage("");
    setFileName(null);
    setImagePreview(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (!SpeechRecognition) return alert("Speech recognition not supported.");

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch {
        alert("Could not access mic.");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePasteLink = () => {
    const url = prompt("Paste your link:");
    if (url) setMessage((prev) => prev + " " + url);
  };

  return (
    <div className="w-full border rounded-xl p-4 bg-white shadow-sm">
      <textarea
        ref={textareaRef}
        rows={1}
        className="w-full max-h-40 overflow-y-auto resize-none outline-none text-sm text-gray-800 placeholder:text-gray-400 bg-transparent mb-3"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* File/Image preview */}
      {fileName && (
        <div className="text-xs text-gray-500 mb-2">📎 File: {fileName}</div>
      )}
      {imagePreview && (
        <div className="mb-2">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-40 rounded-lg border"
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between text-gray-600">
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            <Plus size={18} title="Attach File" />
            <input type="file" hidden onChange={handleFileChange} />
          </label>

          <button onClick={() => alert("🌐 Web search not implemented")}>
            <Globe size={18} title="Search Web" />
          </button>

          <label className="cursor-pointer">
            <ImageIcon size={18} title="Attach Image" />
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </label>

          <button onClick={handlePasteLink}>
            <LinkIcon size={18} title="Paste Link" />
          </button>

          <span className="text-sm font-semibold">4o</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMicClick}
            title={listening ? "Stop listening" : "Start voice input"}
            className={listening ? "text-red-500 animate-pulse" : ""}
          >
            <Mic size={18} />
          </button>
          <button
            className="bg-black text-white p-1.5 rounded-full"
            onClick={() => alert("🟤 Voice mode toggled")}
            title="Voice Mode"
          >
            <Waves size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
