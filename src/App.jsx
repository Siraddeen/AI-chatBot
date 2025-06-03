import { useState } from "react";
import { Chat } from "./components/Chat/chat";
import { Assistant } from "./bots/google";
import { Controls } from "./components/controls/Controls";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // <-- loader state

  function addMessage(message) {
    setMessages((preMessages) => [...preMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setLoading(true); // show loader
    try {
      const result = await assistant.chat(content);
      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      addMessage({ content: "sorry ,try agian", role: "system" });
    }
    setLoading(false); // hide loader
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col">
        <header className="bg-white rounded-t-lg shadow-sm p-4 flex items-center gap-3 border-b">
          <img src="chat-bot.png" alt="Chat Bot" className="h-12 w-12" />
          <h2 className="text-2xl font-semibold text-gray-800">AI ChatBot</h2>
          <h5>by </h5>
          <h3 className=" font-bold text-orange-500">Siraddeen</h3>
        </header>
        <div className="flex-1 bg-white rounded-b-lg shadow-sm overflow-hidden">
          <Chat messages={messages} />
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"></div>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Controls
            onsend={handleContentSend}
            disabled={loading}
            isDisabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
