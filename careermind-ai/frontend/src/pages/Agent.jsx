import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
  Bot, User, Send, Loader2, Mic, MicOff,
  Volume2, VolumeX, StopCircle, Trash2, ChevronDown, CheckCircle2, Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Provider config ──────────────────────────────────────────────────────────
const PROVIDERS = [
  {
    id: 'auto',
    label: 'Auto (Best Available)',
    icon: '⚡',
    color: 'from-indigo-500 to-purple-600',
    badge: 'bg-indigo-100 text-indigo-700',
    desc: 'Tries Groq → Gemini → ChatGPT → DeepSeek'
  },
  {
    id: 'gemini',
    label: 'Google Gemini',
    icon: '✦',
    color: 'from-blue-500 to-cyan-500',
    badge: 'bg-blue-100 text-blue-700',
    desc: 'gemini-1.5-flash · Free tier available'
  },
  {
    id: 'openai',
    label: 'ChatGPT (OpenAI)',
    icon: '🤖',
    color: 'from-emerald-500 to-teal-500',
    badge: 'bg-emerald-100 text-emerald-700',
    desc: 'gpt-3.5-turbo · Paid API required'
  },
  {
    id: 'deepseek',
    label: 'DeepSeek',
    icon: '🔍',
    color: 'from-orange-500 to-red-500',
    badge: 'bg-orange-100 text-orange-700',
    desc: 'deepseek-chat · Budget-friendly'
  },
  {
    id: 'groq',
    label: 'Groq (Llama 3)',
    icon: '⚡',
    color: 'from-orange-400 to-pink-500',
    badge: 'bg-orange-100 text-orange-600',
    desc: 'llama-3.3-70b · Blazing fast'
  },
];

// ─── Speech synthesis ─────────────────────────────────────────────────────────
const speak = (text, onEnd) => {
  window.speechSynthesis.cancel();
  const cleaned = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,3} /g, '')
    .replace(/•/g, '')
    .replace(/\n+/g, '. ');

  const utterance = new SpeechSynthesisUtterance(cleaned);
  utterance.rate = 1.05;
  utterance.pitch = 1.05;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen')
  ) || voices[0];
  if (preferred) utterance.voice = preferred;
  utterance.onend = onEnd || null;
  window.speechSynthesis.speak(utterance);
};

// ─── Quick Prompts ────────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { label: '🎯 Mock Interview', text: 'Start a mock DSA interview with me' },
  { label: '📄 Resume Tips', text: 'Give me top resume tips for a fresher' },
  { label: '🗺️ Career Roadmap', text: 'What career roadmap should I follow for web development?' },
  { label: '💼 Internship Hunt', text: 'How do I find my first internship?' },
];

// ─── Provider Badge ───────────────────────────────────────────────────────────
function ProviderBadge({ source }) {
  const p = PROVIDERS.find(x => x.id === source);
  if (!p || source === 'fallback') return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">🤖 Smart fallback</span>
  );
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.badge}`}>
      {p.icon} {p.label}
    </span>
  );
}

// ─── Provider Selector Dropdown ───────────────────────────────────────────────
function ProviderSelector({ selected, onChange, available }) {
  const [open, setOpen] = useState(false);
  const p = PROVIDERS.find(x => x.id === selected) || PROVIDERS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:border-gray-300 text-sm font-medium text-gray-700 transition-all shadow-sm"
      >
        <span>{p.icon}</span>
        <span className="hidden sm:inline max-w-[120px] truncate">{p.label}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2">Select AI Provider</p>
              {PROVIDERS.map(pv => {
                const isAvailable = pv.id === 'auto' || available[pv.id];
                return (
                  <button
                    key={pv.id}
                    onClick={() => { onChange(pv.id); setOpen(false); }}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                      selected === pv.id
                        ? 'bg-gray-50 border border-gray-200'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <span className="text-lg mt-0.5">{pv.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">{pv.label}</span>
                        {selected === pv.id && <CheckCircle2 size={13} className="text-green-500" />}
                        {pv.id !== 'auto' && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                          }`}>
                            {isAvailable ? '✓ Ready' : '⚠ No key'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{pv.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="px-4 pb-3 pt-1 border-t border-gray-100">
              <p className="text-xs text-gray-400">Add API keys in <code className="bg-gray-100 px-1 rounded">backend/.env</code></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Agent Component ──────────────────────────────────────────────────────
const Agent = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `👋 Hi ${user?.fullName?.split(' ')[0] || 'there'}! I'm CareerMind AI — your personal career advisor.\n\nI can help you with mock interviews, resume reviews, career roadmaps, and internship strategies.\n\nWhat would you like to work on today?`,
  }]);
  const [input, setInput]           = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening]   = useState(false);
  const [source, setSource]         = useState(null);
  const [provider, setProvider]     = useState('auto');
  const [available, setAvailable]   = useState({ gemini: false, openai: false, deepseek: false, groq: false });

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Fetch which providers are configured
  useEffect(() => {
    api.get('/agent/providers').then(r => setAvailable(r.data)).catch(() => {});
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Greet on load with voice
  useEffect(() => {
    if (voiceEnabled) {
      window.speechSynthesis.getVoices();
      setTimeout(() => { speak(messages[0].content, () => setIsSpeaking(false)); setIsSpeaking(true); }, 600);
    }
  }, []);

  // Speech recognition
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous = false;
    r.interimResults = true;
    r.lang = 'en-US';
    r.onresult = (e) => setInput(Array.from(e.results).map(x => x[0].transcript).join(''));
    r.onend = () => setIsListening(false);
    r.onerror = () => setIsListening(false);
    recognitionRef.current = r;
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) return alert('Speech recognition requires Chrome browser.');
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    else {
      window.speechSynthesis.cancel(); setIsSpeaking(false);
      recognitionRef.current.start(); setIsListening(true);
    }
  };

  const stopSpeaking = () => { window.speechSynthesis.cancel(); setIsSpeaking(false); };

  const sendMessage = useCallback(async (text) => {
    const trimmed = text || input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setIsLoading(true);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    try {
      const history = messages.slice(-6);
      const { data } = await api.post('/agent/chat', { message: trimmed, history, provider });
      setSource(data.source);
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      if (voiceEnabled) {
        setTimeout(() => { speak(data.reply, () => setIsSpeaking(false)); setIsSpeaking(true); }, 200);
      }
    } catch {
      const err = "Sorry, I'm having trouble connecting. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: err }]);
      if (voiceEnabled) speak(err, () => setIsSpeaking(false));
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, voiceEnabled, provider]);

  const clearChat = () => {
    stopSpeaking();
    setMessages([{ role: 'assistant', content: '👋 Chat cleared! Ready for a fresh start. What would you like to work on?' }]);
  };

  const renderContent = (content) =>
    content.split('\n').map((line, i) => {
      const html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />;
    });

  const activeProvider = PROVIDERS.find(p => p.id === provider) || PROVIDERS[0];

  return (
    <div className="flex h-screen pt-16 bg-gray-50 overflow-hidden">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <Link to="/dashboard" className="text-sm text-green-700 font-semibold hover:text-green-600 flex items-center gap-2 mb-4">
            ← Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeProvider.color} text-white flex items-center justify-center shadow-lg text-lg`}>
              {activeProvider.icon}
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-sm">CareerMind Agent</h2>
              <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {activeProvider.label}
              </p>
            </div>
          </div>
        </div>

        {/* AI Provider Picker */}
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">AI Provider</h3>
          <div className="space-y-1.5">
            {PROVIDERS.map(pv => {
              const isReady = pv.id === 'auto' || available[pv.id];
              return (
                <button
                  key={pv.id}
                  onClick={() => setProvider(pv.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    provider === pv.id
                      ? 'bg-gray-100 border border-gray-300 font-semibold text-gray-800'
                      : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <span className="text-base">{pv.icon}</span>
                  <span className="flex-1 text-left text-sm leading-tight">{pv.label}</span>
                  {pv.id === 'auto'
                    ? <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 font-medium">auto</span>
                    : isReady
                      ? <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                      : <Circle size={13} className="text-gray-300 shrink-0" />
                  }
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
            Add keys in <code className="bg-gray-100 px-1 rounded">backend/.env</code>
          </p>
        </div>

        {/* Voice Controls */}
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Voice Controls</h3>
          <div className="space-y-2">
            <button
              onClick={() => { setVoiceEnabled(v => !v); if (isSpeaking) stopSpeaking(); }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                voiceEnabled ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'
              }`}
            >
              {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {voiceEnabled ? 'Voice Enabled' : 'Voice Disabled'}
            </button>
            {isSpeaking && (
              <button onClick={stopSpeaking} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                <StopCircle size={16} /> Stop Speaking
              </button>
            )}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="p-5 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Topics</h3>
          <div className="space-y-1.5">
            {QUICK_PROMPTS.map((p, i) => (
              <button key={i} onClick={() => sendMessage(p.text)} disabled={isLoading}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200 transition-all disabled:opacity-50">
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button onClick={clearChat} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
            <Trash2 size={14} /> Clear Chat
          </button>
        </div>
      </div>

      {/* ── Chat Area ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">

        {/* Header */}
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeProvider.color} text-white flex items-center justify-center shadow-md text-lg`}>
                {activeProvider.icon}
              </div>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
              )}
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-sm">CareerMind Agent</h2>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {isSpeaking ? '🗣️ Speaking...' : isListening ? '🎤 Listening...' : 'Ready to help'}
              </p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Provider picker (mobile + desktop) */}
            <ProviderSelector selected={provider} onChange={setProvider} available={available} />
            <button
              onClick={() => { setVoiceEnabled(v => !v); }}
              className={`p-2 rounded-lg transition-all ${voiceEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-5 bg-gradient-to-b from-gray-50/60 to-white">

          {/* Mobile quick chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {QUICK_PROMPTS.map((p, i) => (
              <button key={i} onClick={() => sendMessage(p.text)} disabled={isLoading}
                className="shrink-0 text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-green-400 hover:text-green-700 transition-all shadow-sm disabled:opacity-50">
                {p.label}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center shadow-sm mt-0.5 text-sm
                  ${msg.role === 'user'
                    ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white'
                    : `bg-gradient-to-br ${activeProvider.color} text-white`
                  }`}>
                  {msg.role === 'user' ? <User size={15} /> : activeProvider.icon}
                </div>

                <div className={`max-w-[82%] md:max-w-[70%] px-5 py-3.5 rounded-2xl text-[14.5px] shadow-sm space-y-1
                  ${msg.role === 'user'
                    ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                  }`}>
                  {renderContent(msg.content)}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-3 mt-2 pt-1.5 border-t border-gray-50">
                      <button onClick={() => { speak(msg.content, () => setIsSpeaking(false)); setIsSpeaking(true); }}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-600 transition-colors">
                        <Volume2 size={11} /> Speak
                      </button>
                      {idx === messages.length - 1 && source && <ProviderBadge source={source} />}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className={`w-9 h-9 shrink-0 rounded-full bg-gradient-to-br ${activeProvider.color} text-white flex items-center justify-center shadow-sm text-sm`}>
                {activeProvider.icon}
              </div>
              <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex items-center gap-2">
                {[0, 0.15, 0.3].map((d, i) => (
                  <div key={i} className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                ))}
                <span className="text-xs text-gray-400 ml-1">{activeProvider.label} thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-gray-100 shadow-lg">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2 max-w-4xl mx-auto">
            <button type="button" onClick={toggleMic}
              className={`shrink-0 p-3 rounded-full transition-all shadow-sm ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-600'
              }`}>
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={isListening ? '🎤 Listening... speak now' : 'Ask me anything about your career...'}
              className={`flex-1 px-5 py-3.5 rounded-full border text-gray-800 text-sm focus:outline-none transition-all ${
                isListening
                  ? 'border-red-400 bg-red-50 focus:ring-1 focus:ring-red-400'
                  : 'border-gray-200 bg-gray-50 focus:border-green-500 focus:ring-1 focus:ring-green-500'
              }`}
              disabled={isLoading}
            />

            <button type="submit" disabled={!input.trim() || isLoading}
              className={`shrink-0 p-3 bg-gradient-to-br ${activeProvider.color} text-white rounded-full hover:opacity-90 disabled:from-gray-300 disabled:to-gray-300 transition-all shadow-md disabled:shadow-none`}>
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="translate-x-[1px]" />}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-2">
            Using <span className="font-medium">{activeProvider.label}</span>
            {source && source !== 'fallback' && <> · responded via <span className={`font-medium ${PROVIDERS.find(p=>p.id===source)?.badge?.replace('bg-','text-').replace('-100','') || ''}`}>{source}</span></>}
            {' · '}Click 🔊 on any message to replay
          </p>
        </div>
      </div>
    </div>
  );
};

export default Agent;
