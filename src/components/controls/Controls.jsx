import { useEffect, useState } from "react";
import TextareaAutoSize from "react-textarea-autosize";

export function Controls({ isDisabled = false, onsend }) {
  const textareaRef = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isDisabled) {
      textareaRef.current?.focus();
    }
  }, [isDisabled]);

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      onsend(content);
      setContent("");
    }
  }
  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <TextareaAutoSize
            placeholder="Message AI bot..."
            value={content}
            ref={textareaRef}
            disabled={isDisabled}
            minRows={1}
            maxRows={6}
            onChange={handleContentChange}
            onKeyDown={handleEnterPress}
            className="w-full p-3 pr-12 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none min-h-[60px] max-h-[120px]"
            rows="1"
          />
        </div>
        <button
          onClick={handleContentSend}
          disabled={isDisabled || content.length === 0}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
    </svg>
  );
}
