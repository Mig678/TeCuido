import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you?' },
  ]);

  const sendMessage = (text) => {
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: `You said: ${text}` }]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      <h1 className="text-2xl font-bold mb-4">Chatbot</h1>
      <div className="flex-1 space-y-2 overflow-y-auto p-2 bg-white dark:bg-gray-700 rounded">
        {messages.map((m, idx) => (
          <div key={idx} className={`p-2 rounded ${m.from === 'bot' ? 'bg-gray-200 dark:bg-gray-600' : 'bg-sky-500 text-white'}`}>{m.text}</div>
        ))}
      </div>
      <form
        className="mt-2 flex"
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.msg.value.trim();
          if (text) {
            sendMessage(text);
            e.target.reset();
          }
        }}
      >
        <input name="msg" className="flex-1 px-3 py-2 rounded-l border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-r hover:bg-indigo-700 transition">Send</button>
      </form>
    </div>
  );
}
