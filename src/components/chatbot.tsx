// Chatbot.tsx
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m SkyBot. How can I assist you with flights today?' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chatbot/ask', { message: input });
      const botMsg = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Oops! Something went wrong.' }]);
    } finally {
        setLoading(false);
    }

    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="w-80 h-[450px] bg-white rounded-lg shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
              <span className="font-semibold">SkyBot</span>
              <button onClick={toggleChat}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
                <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                <div
                    className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${
                    msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                </div>
            ))}

            {/* Loader shown as SkyBot is typing... */}
            {loading && (
                <div className="flex justify-start">
                <p className='text-xs text-gray-400'>Skybot is typing...</p>
                </div>
            )}

            <div ref={bottomRef} />
            </div>


            {/* Input */}
            <div className="p-2 border-t flex">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 border rounded-l px-3 py-2 text-sm outline-none"
                placeholder="Ask something..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 text-sm"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
