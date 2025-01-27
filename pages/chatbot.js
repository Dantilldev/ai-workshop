import CustomIcon from '@/src/components/ChatBotIcon';
import LoadingDots from '@/src/components/LoadingDots';
import { fetchGeminiReply } from '@/src/lib/geminiApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const defaultMessages = [
  {
    role: 'ai',
    content: '🤖 Hi!, I am your AI-assisted chatbot, how can I help you today?',
  },
];

export default function Chatbot() {
  const [messages, setMessages] = useState(defaultMessages),
    [userInput, setUserInput] = useState(''),
    [isTyping, setIsTyping] = useState(false),
    chatContainerRef = useRef(null);

  const handleSend = useCallback(async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: userInput }]);
    setUserInput('');
    setIsTyping(true);

    try {
      const reply = await fetchGeminiReply(userInput);

      setMessages((prev) => [...prev, { role: 'ai', content: reply }]);
    } catch (error) {
      console.log('error', error);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Something went wrong. Try again.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [userInput]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className='flex flex-col items-center justify-center px-2'
    >
      <div className='w-full max-w-md sm:max-w-sm p-4 mt-6 bg-gray-50 shadow-lg rounded-lg '>
        <div className='flex  gap-5 px-3'>
          <CustomIcon />
          <h1 className='text-2xl font-bold text-center mb-4 text-slate-800'>
            AI-Assisted Chatbot
          </h1>
        </div>
        <div
          className='h-80 overflow-y-auto border p-2 mb-4 relative flex flex-col justify-between'
          ref={chatContainerRef}
        >
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-sm p-3 rounded-lg shadow-md ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-800 text-gray-100 rounded-tl-none'
                }`}
              >
                <p>{msg.content}</p>
                <div className='text-xs text-gray-400 mt-1'>
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className='flex items-center gap-2'>
              <CustomIcon />
              <div className='p-2 text-gray-100 rounded-lg'>
                <LoadingDots />
              </div>
            </div>
          )}
        </div>
        <div className='flex'>
          <input
            type='text'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='flex-grow border p-2 rounded-l-md text-black'
            placeholder='Ask me anything...'
            onKeyDown={handleKeyDown}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className='bg-blue-500 text-white px-4 py-2 rounded-r-md'
          >
            Send
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
