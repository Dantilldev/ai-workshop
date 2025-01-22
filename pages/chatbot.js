import LoadingDots from '@/src/components/LoadingDots';
import { fetchGeminiReply } from '@/src/lib/geminiApi';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]),
    [userInput, setUserInput] = useState(''),
    [isTyping, setIsTyping] = useState(false),
    chatContainerRef = useRef(null);

  const handleSend = useCallback(async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: userInput }]);
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
      setUserInput('');
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
    <div className='min-h-screen flex flex-col items-center justify-center px-2'>
      <div className='w-full max-w-md p-4 bg-slate-800 shadow-lg rounded-lg'>
        <h1 className='text-2xl font-bold text-center mb-4'>AI Chatbot</h1>
        <div
          className='h-64 overflow-y-auto border p-2 mb-4 relative'
          ref={chatContainerRef}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${
                msg.role === 'user'
                  ? 'text-right text-blue-500'
                  : 'text-left text-white'
              }`}
            >
              <p>{msg.content}</p>
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
            className='flex-grow border p-2 rounded-l-md bg-slate-900'
            placeholder='Ask me anything...'
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
