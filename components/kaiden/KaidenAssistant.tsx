
import React, { useState, useRef, useEffect } from 'react';
import { getKaidenResponse } from '../../services/geminiService';

const KaidenAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'kaiden'; text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      getKaidenResponse("Hello").then(response => {
        setMessages([{ sender: 'kaiden', text: response }]);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSend = async () => {
    if (userInput.trim() === '' || isLoading) return;
    const newMessages = [...messages, { sender: 'user' as const, text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const response = await getKaidenResponse(userInput);
    setMessages([...newMessages, { sender: 'kaiden' as const, text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat Window */}
      <div className={`absolute bottom-28 right-0 w-80 sm:w-96 bg-parchment-light border-2 border-warm-gold rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="p-4 border-b border-amber-glow/50">
          <h3 className="font-heading text-lg font-bold text-ink-dark">Chat with Kaiden</h3>
        </div>
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'kaiden' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'kaiden' ? 'bg-parchment-dark text-ink-dark' : 'bg-warm-gold text-white'}`}>
                <p className="text-sm font-body">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="max-w-[80%] p-3 rounded-lg bg-parchment-dark text-ink-dark">
                  <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-shadow-soft rounded-full animate-pulse"></div>
                     <div className="w-2 h-2 bg-shadow-soft rounded-full animate-pulse [animation-delay:0.2s]"></div>
                     <div className="w-2 h-2 bg-shadow-soft rounded-full animate-pulse [animation-delay:0.4s]"></div>
                  </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-amber-glow/50 flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for guidance..."
            className="flex-grow bg-parchment-dark border border-amber-glow/50 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-glow text-ink-dark placeholder-shadow-soft"
          />
          <button onClick={handleSend} className="bg-warm-gold text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-quest-active transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
      
      {/* Floating Orb */}
      <div
        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-magic-purple to-amber-glow shadow-2xl shadow-amber-glow/50 animate-float cursor-pointer flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-4xl" role="img" aria-label="sparkle">✨</span>
      </div>
    </div>
  );
};

export default KaidenAssistant;
