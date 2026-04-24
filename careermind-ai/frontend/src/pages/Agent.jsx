import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Bot, ExternalLink, Brain, Code, FileText, 
  Target, Lightbulb, Sparkles, ChevronRight, MessageSquare,
  Maximize2, Minimize2, X
} from 'lucide-react';

const FEATURES = [
  { icon: <Code size={18} />, label: 'LeetCode Problems', desc: 'Get AI-guided solutions for coding challenges', color: 'from-blue-500 to-cyan-500' },
  { icon: <Brain size={18} />, label: 'DSA Concepts', desc: 'Understand data structures & algorithms deeply', color: 'from-purple-500 to-pink-500' },
  { icon: <FileText size={18} />, label: 'Code Review', desc: 'Get instant feedback on your code quality', color: 'from-orange-500 to-red-500' },
  { icon: <Target size={18} />, label: 'Interview Prep', desc: 'Practice with real interview-style questions', color: 'from-green-500 to-emerald-500' },
];

const QUICK_ACTIONS = [
  { label: '🎯 Two Sum', prompt: 'Explain the Two Sum problem and its optimal solution' },
  { label: '🔗 Linked List', prompt: 'How to reverse a linked list?' },
  { label: '🌳 Binary Tree', prompt: 'Explain BFS vs DFS in binary trees' },
  { label: '📊 Dynamic Programming', prompt: 'Give me a beginner-friendly DP problem' },
  { label: '⚡ Sorting', prompt: 'Compare QuickSort vs MergeSort' },
  { label: '🧩 Sliding Window', prompt: 'Explain the sliding window technique' },
];

const Agent = () => {
  useEffect(() => {
    localStorage.setItem('visited_agent', 'true');
  }, []);

  const { user } = useAuth();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="flex h-screen pt-16 bg-gray-950 overflow-hidden">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      {!isFullscreen && (
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden lg:flex flex-col w-80 bg-gray-900 border-r border-gray-800"
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-800">
            <Link to="/dashboard" className="text-sm text-emerald-400 font-semibold hover:text-emerald-300 flex items-center gap-2 mb-5 transition-colors">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Bot size={24} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-gray-900" />
                </span>
              </div>
              <div>
                <h2 className="font-bold text-white text-base">AI Coding Coach</h2>
                <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Sparkles size={12} /> LeetCode AI Assistant
                </p>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="p-5 border-b border-gray-800">
            <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {user?.fullName?.charAt(0) || 'S'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{user?.fullName || 'Student'}</p>
                  <p className="text-xs text-gray-400">{user?.email || 'Not logged in'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What I Can Help With</h3>
            <div className="space-y-2">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-800/50 transition-colors group cursor-default">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{f.label}</p>
                    <p className="text-xs text-gray-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-5 flex-1 overflow-y-auto">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Topics</h3>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((a, i) => (
                <button 
                  key={i} 
                  className="text-xs px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 border border-gray-700 transition-all"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Open in New Tab */}
          <div className="p-4 border-t border-gray-800">
            <a 
              href="https://doc-analyzer--manjujakanahall.replit.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all border border-gray-700 hover:border-emerald-500/30"
            >
              <ExternalLink size={14} /> Open in New Tab
            </a>
          </div>
        </motion.div>
      )}

      {/* ── Main Chat Area ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Bar */}
        <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between bg-gray-900/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Bot size={20} />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>
            <div>
              <h2 className="font-bold text-white text-sm flex items-center gap-2">
                CareerMind AI Coach
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">LIVE</span>
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                Powered by LeetCode AI · Ask anything about DSA & coding
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <a 
              href="https://doc-analyzer--manjujakanahall.replit.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20"
            >
              <ExternalLink size={14} /> Open Full View
            </a>
          </div>
        </div>

        {/* Welcome Overlay (shown first time) */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-8"
              style={{ marginTop: '64px' }}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} 
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="bg-gray-900 rounded-3xl p-8 max-w-lg w-full border border-gray-700 shadow-2xl shadow-emerald-500/5"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mx-auto mb-4">
                    <Bot size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome to AI Coding Coach! 🚀</h2>
                  <p className="text-gray-400 text-sm mb-6">
                    Hi <span className="text-emerald-400 font-semibold">{user?.fullName?.split(' ')[0] || 'there'}</span>! 
                    I'm your personal LeetCode AI assistant. I can help you solve coding problems, 
                    understand DSA concepts, review your code, and prepare for technical interviews.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {FEATURES.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center text-white shrink-0`}>
                          {f.icon}
                        </div>
                        <span className="text-xs text-gray-300 font-medium">{f.label}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowWelcome(false)}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={18} /> Start Chatting <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Embedded Chatbot */}
        <div className="flex-1 relative bg-gray-950">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-none bg-gradient-to-b from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none z-10" />
          
          <iframe
            src="https://doc-analyzer--manjujakanahall.replit.app"
            title="CareerMind AI Coding Coach"
            className="w-full h-full border-0"
            style={{ minHeight: '500px' }}
            allow="microphone; camera; clipboard-read; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
          />
        </div>

        {/* Bottom Status Bar */}
        <div className="px-5 py-2 bg-gray-900 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected to AI
            </div>
            <span className="text-xs text-gray-600">|</span>
            <span className="text-xs text-gray-500">Powered by <span className="text-emerald-400 font-medium">LeetCode AI Coach</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb size={12} className="text-yellow-500" />
            <span className="text-xs text-gray-500">Tip: Ask about any LeetCode problem by number or name</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;
