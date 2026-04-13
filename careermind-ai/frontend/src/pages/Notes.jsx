import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Database, Network, Layout, Boxes, ShieldAlert } from 'lucide-react';

const Notes = () => {
  const categories = [
    { id: 'dsa', title: 'Data Structures & Algorithms', desc: 'Arrays, Trees, Graphs, DP and more.', icon: Boxes, diff: 'Hard', color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'os', title: 'Operating Systems', desc: 'Process Management, Threads, Deadlocks.', icon: Cpu, diff: 'Medium', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'dbms', title: 'Database Management Systems', desc: 'SQL, Normalization, Transactions.', icon: Database, diff: 'Medium', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'cn', title: 'Computer Networks', desc: 'OSI Model, TCP/IP, Routing.', icon: Network, diff: 'Hard', color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'web', title: 'Web Development Basics', desc: 'HTML, CSS, JS, React concepts.', icon: Layout, diff: 'Easy', color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'system', title: 'System Design', desc: 'Scalability, Load Balancing, Microservices.', icon: ShieldAlert, diff: 'Hard', color: 'text-red-500', bg: 'bg-red-50' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#14532D] mb-4">Engineering <span className="text-[#16A34A]">Notes</span></h1>
          <p className="text-lg text-gray-600">To-the-point revision material crafted for last-minute interview prep.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={cat.id} 
              className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon size={28} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  cat.diff === 'Hard' ? 'border-red-200 text-red-600 bg-red-50' : 
                  cat.diff === 'Medium' ? 'border-orange-200 text-orange-600 bg-orange-50' : 
                  'border-green-200 text-green-600 bg-green-50'
                }`}>
                  {cat.diff}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{cat.title}</h3>
              <p className="text-gray-500 mb-8">{cat.desc}</p>
              
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#F0FDF4] text-[#14532D] font-semibold rounded-xl hover:bg-[#16A34A] hover:text-white transition-colors">
                <FileText size={18} /> View Notes
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
