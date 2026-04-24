import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, BookCheck, ShieldAlert, X, ChevronRight, Briefcase } from 'lucide-react';
import { companyData } from '../data/companyData';



const Interview = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showHrGuide, setShowHrGuide] = useState(false);

  useEffect(() => {
    localStorage.setItem('completed_mock', 'true');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
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
              <Briefcase size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Company-wise Questions</h3>
            <p className="text-gray-500 mb-6">Click a company below to view frequently asked technical and behavioral questions.</p>
            <div className="flex flex-wrap gap-2 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {Object.keys(companyData).map(c => (
                <button 
                  key={c} 
                  onClick={() => setSelectedCompany(c)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <BookCheck size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Behavioral & HR (STAR)</h3>
            <p className="text-gray-500 mb-6">Master the STAR method. Top curated HR questions with model answers and tips.</p>
            <ul className="space-y-3 mb-6 text-sm text-gray-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> "Tell me about yourself"</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> "Why should we hire you?"</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> "Describe a time you failed"</li>
            </ul>
            <button 
              onClick={() => setShowHrGuide(true)}
              className="text-[#16A34A] font-semibold hover:underline"
            >
              View HR Guide &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* Questions Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                    {selectedCompany[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedCompany} Interview Questions</h2>
                    <p className="text-xs text-gray-500 font-medium">Curated frequently asked questions</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCompany(null)}
                  className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 bg-gray-50/50">
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl mb-6">
                  <h4 className="text-sm font-bold text-blue-800 mb-1">About {selectedCompany}</h4>
                  <p className="text-sm text-blue-900/80 leading-relaxed">{companyData[selectedCompany].info}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">Mock Questions Bank</h3>
                  <a 
                    href={companyData[selectedCompany].formLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#16A34A] text-white text-sm font-bold rounded-xl hover:bg-[#15803d] transition-colors shadow-md shadow-green-500/20 flex items-center gap-2"
                  >
                    Take Mock Test (Google Form) <ChevronRight size={14} />
                  </a>
                </div>

                {companyData[selectedCompany].questions.map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h4 className="text-gray-800 font-bold leading-relaxed">{item.q}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold border border-gray-200">
                        {item.type}
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        item.level === 'Hard' ? 'bg-red-50 text-red-600 border-red-100' :
                        item.level === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                        'bg-green-50 text-green-600 border-green-100'
                      }`}>
                        {item.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
                <button 
                  onClick={() => setSelectedCompany(null)}
                  className="px-6 py-2 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HR Guide Modal */}
      <AnimatePresence>
        {showHrGuide && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowHrGuide(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
                    <BookCheck size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">STAR Method & HR Guide</h2>
                    <p className="text-xs text-gray-500 font-medium">Master behavioral interviews</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHrGuide(false)}
                  className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8 bg-white">
                
                {/* The STAR Method Explanation */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">What is the STAR Method?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <div className="text-blue-600 font-extrabold text-xl mb-1">S</div>
                      <h4 className="font-bold text-gray-900 text-sm">Situation</h4>
                      <p className="text-xs text-gray-600 mt-1">Set the scene and give the necessary details of your example.</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                      <div className="text-orange-600 font-extrabold text-xl mb-1">T</div>
                      <h4 className="font-bold text-gray-900 text-sm">Task</h4>
                      <p className="text-xs text-gray-600 mt-1">Describe what your responsibility was in that situation.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                      <div className="text-green-600 font-extrabold text-xl mb-1">A</div>
                      <h4 className="font-bold text-gray-900 text-sm">Action</h4>
                      <p className="text-xs text-gray-600 mt-1">Explain exactly what steps you took to address it.</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                      <div className="text-purple-600 font-extrabold text-xl mb-1">R</div>
                      <h4 className="font-bold text-gray-900 text-sm">Result</h4>
                      <p className="text-xs text-gray-600 mt-1">Share what outcomes your actions achieved (use numbers!).</p>
                    </div>
                  </div>
                </section>

                <hr className="border-gray-100" />

                {/* Common Questions */}
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Top 5 Behavioral Questions</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-2xl p-5">
                      <h4 className="font-bold text-gray-800 mb-2">1. "Tell me about yourself."</h4>
                      <p className="text-sm text-gray-600 mb-2"><strong>Strategy:</strong> Use the Past-Present-Future formula. Keep it strictly professional.</p>
                      <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-700 italic border border-gray-100">
                        "I am currently a [Role] at [Company], where I handle [Present]. Before that, I worked at [Past Company] where I built [Past]. Now, I'm looking to leverage these skills in [Future Goal]..."
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-2xl p-5">
                      <h4 className="font-bold text-gray-800 mb-2">2. "Describe a time you failed."</h4>
                      <p className="text-sm text-gray-600 mb-2"><strong>Strategy:</strong> Don't fake a weakness. Share a real, small failure, but spend 80% of the time explaining what you learned and how you fixed it.</p>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5">
                      <h4 className="font-bold text-gray-800 mb-2">3. "Why should we hire you?"</h4>
                      <p className="text-sm text-gray-600 mb-2"><strong>Strategy:</strong> Map your skills directly to the job description. Show that you don't just want *a* job, you want *this* job.</p>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5">
                      <h4 className="font-bold text-gray-800 mb-2">4. "Tell me about a time you handled a conflict."</h4>
                      <p className="text-sm text-gray-600 mb-2"><strong>Strategy:</strong> Avoid blaming others. Focus on communication, empathy, and finding a compromise for the sake of the project.</p>
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-5">
                      <h4 className="font-bold text-gray-800 mb-2">5. "Where do you see yourself in 5 years?"</h4>
                      <p className="text-sm text-gray-600 mb-2"><strong>Strategy:</strong> Show ambition but remain realistic. Align your goals with the company's growth path (e.g., aiming to be a Senior Developer or Team Lead).</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                <button 
                  onClick={() => setShowHrGuide(false)}
                  className="px-6 py-2 bg-[#16A34A] text-white font-bold rounded-xl hover:bg-[#15803d] transition-colors"
                >
                  Got It!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Interview;
