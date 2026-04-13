import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Bot, User, Send, Loader2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Agent = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi ${user?.fullName?.split(' ')[0] || 'there'}! I'm CareerMind AI. Ready for a mock interview or need some targeted notes?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // API call to our backend which talks to Claude/OpenAI
      const { data } = await api.post('/agent/chat', { message: input });
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Let's try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen pt-20 bg-gray-50 overflow-hidden">
      {/* Sidebar - Optional history */}
      <div className="hidden md:flex flex-col w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-100 bg-[#F0FDF4]/50">
          <Link to="/dashboard" className="text-sm text-[#14532D] font-semibold tracking-wide flex items-center gap-2 hover:bg-[#F0FDF4] px-3 py-2 rounded-lg transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Topics</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-[#F0FDF4] hover:text-[#16A34A] transition-colors flex items-center gap-2">
              <Bot size={16} /> Mock Interview
            </li>
            <li className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer hover:text-[#16A34A] transition-colors flex items-center gap-2">
              <Info size={16} /> Resume Review
            </li>
          </ul>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative w-full max-w-4xl mx-auto shadow-xl shadow-gray-200/40 bg-white md:my-4 md:rounded-2xl border border-gray-100 overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shadow-sm relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EF4444] text-white flex items-center justify-center shadow-lg shadow-red-500/20">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">CareerMind Agent</h2>
              <p className="text-xs text-[#16A34A] font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span> Online
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50/50">
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center shadow-sm
                ${msg.role === 'user' ? 'bg-[#14532D] text-white' : 'bg-white text-red-500 border border-gray-200'}
              `}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-[85%] md:max-w-[75%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-[#16A34A] text-white rounded-tr-sm' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                }
              `}>
                {/* Note: In a real app we'd parse markdown here */}
                {msg.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-white text-red-500 border border-gray-200 flex items-center justify-center shadow-sm">
                <Bot size={20} />
              </div>
              <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your career..."
              className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-gray-200 text-gray-800 rounded-full focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] transition-all shadow-inner"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2.5 bg-[#16A34A] text-white rounded-full hover:bg-[#22C55E] disabled:bg-gray-300 transition-colors"
            >
              <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Agent;
