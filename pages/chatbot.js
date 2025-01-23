import CustomIcon from '@/src/components/ChatBotIcon';
import LoadingDots from '@/src/components/LoadingDots';
import { fetchGeminiReply } from '@/src/lib/geminiApi';
import { useCallback, useEffect, useRef, useState } from 'react';

const defaultMessages = [
  {
    role: 'ai',
    content:
      'Hej! Jag är din AI-assisterade chattbo, hur kan jag hjälpa dig idag?',
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
    <div className='flex flex-col items-center justify-center px-2'>
      <div className='w-full max-w-md p-4 mt-6 bg-gray-50 shadow-lg rounded-lg '>
        <div className='flex  gap-5 px-3'>
          <CustomIcon />
          <h1 className='text-2xl font-bold text-center mb-4 text-slate-800'>
            AI-assisterad Chatbot
          </h1>
        </div>
        <div
          className='h-80 overflow-y-auto border p-2 mb-4 relative'
          ref={chatContainerRef}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
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
              </div>
            </div>
          ))}

          {isTyping && (
            <div className='absolute bottom-2 left-2'>
              <LoadingDots />
            </div>
          )}
        </div>
        <div className='flex'>
          <input
            type='text'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='flex-grow border p-2 rounded-l-md text-black'
            placeholder='Fråga mig vad som helst...'
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            className='bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
