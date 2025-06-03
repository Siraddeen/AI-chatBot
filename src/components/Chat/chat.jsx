import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

const WELCOME_MESSAGE = {
  role: "oi",
  content: "Hi! How can I assist you today?",
};

export function Chat({ messages }) {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);
  return (
    <div className="flex flex-col gap-4 p-4 h-[calc(100vh-200px)] overflow-y-auto">
      {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
        <div
          key={index}
          className={`flex ${
            role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              role === "user"
                ? "bg-blue-500 text-white"
                : role === "assistant"
                ? "bg-gray-100 text-gray-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <Markdown>{content}</Markdown>
          </div>
          <div ref={messagesEndRef} />
        </div>
      ))}
    </div>
  );
}
