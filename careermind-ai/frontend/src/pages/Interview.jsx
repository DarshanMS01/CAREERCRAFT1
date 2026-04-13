import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, BookCheck, ShieldAlert, Cpu } from 'lucide-react';

const Interview = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#14532D] mb-4">Interview <span className="text-[#16A34A]">Prep Hub</span></h1>
          <p className="text-lg text-gray-600">Simulate real interviews, browse company-specific questions, and hone your behavioral skills.</p>
        </div>

        {/* Simulator Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#14532D] to-[#16A34A] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-medium text-xs mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span> AI Powered
            </div>
            <h2 className="text-3xl font-bold mb-4">Mock Interview Simulator</h2>
            <p className="text-[#F0FDF4]/90 mb-8 max-w-lg">
              Take a comprehensive mock interview covering HR, Technical, or System Design. Receive an immediate score and actionable feedback from our AI.
            </p>
            <button className="px-8 py-4 bg-white text-[#14532D] font-bold rounded-full hover:bg-gray-50 transition-colors shadow-lg shadow-black/10 flex items-center gap-2">
              <BrainCircuit size={20} /> Launch Simulator
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none">
            <BrainCircuit size={300} />
          </div>
        </motion.div>

        {/* Q-Banks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Company-wise Questions</h3>
            <p className="text-gray-500 mb-6">Browse specific questions asked at Google, Amazon, Microsoft, TCS, Infosys, and more.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Google', 'Amazon', 'TCS', 'Infosys'].map(c => (
                <span key={c} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">{c}</span>
              ))}
            </div>
            <button className="text-[#16A34A] font-semibold hover:underline">Explore Question Bank &rarr;</button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <BookCheck size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Behavioral & HR (STAR)</h3>
            <p className="text-gray-500 mb-6">Master the STAR method. Top 25 curated HR questions with model answers and tips.</p>
            <ul className="space-y-3 mb-6 text-sm text-gray-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> "Tell me about yourself"</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> "Why should we hire you?"</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> "Describe a time you failed"</li>
            </ul>
            <button className="text-[#16A34A] font-semibold hover:underline">View HR Guide &rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Interview;
