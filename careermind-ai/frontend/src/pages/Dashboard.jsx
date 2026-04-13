import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, BookOpen, Clock, Target, ArrowRight, Activity, Award } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mocks based on schema
  const stats = [
    { label: "Enrolled Courses", value: user?.enrolledCourses?.length || 0, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Mock Interviews", value: user?.interviewAttempts || 0, icon: Activity, color: "text-green-500", bg: "bg-green-50" },
    { label: "AI Chats", value: 12, icon: Bot, color: "text-purple-500", bg: "bg-purple-50" }
  ];

  const recommendedCourses = [
    { id: 1, title: "DSA Mastery for Interviews", duration: "8 weeks", instructor: "Alex J." },
    { id: 2, title: "System Design for SDE", duration: "6 weeks", instructor: "Sarah M." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#14532D] rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Hello, {user?.fullName?.split(' ')[0]}! 👋
            </h1>
            <p className="text-[#F0FDF4]/80 text-lg md:text-xl max-w-2xl mb-8">
              Ready to crack your next interview for a <span className="font-semibold text-white">{user?.targetRole}</span> role?
            </p>
            <div className="flex gap-4">
              <Link to="/agent" className="bg-[#EF4444] hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-red-500/20">
                <Bot size={20} /> Start Mock Interview
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4">
            <Target size={300} strokeWidth={1} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recommended Courses */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recommended for {user?.targetRole}</h2>
                <Link to="/courses" className="text-sm font-semibold text-[#16A34A] hover:text-[#22C55E] flex items-center gap-1">
                  View all <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCourses.map(course => (
                  <div key={course.id} className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
                        <Award size={20} />
                      </div>
                      <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{course.duration}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#16A34A] transition-colors">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">by {course.instructor}</p>
                    <button className="w-full py-2 bg-gray-50 hover:bg-[#16A34A] hover:text-white text-[#14532D] font-medium rounded-lg text-sm transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Recent AI Chats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { title: "React Context API explanation", time: "2 hours ago" },
                  { title: "Amazon SDE Mock Interview", time: "Yesterday" }
                ].map((chat, i) => (
                  <div key={i} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                        <Bot size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{chat.title}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock size={12} /> {chat.time}</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Profile Card */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-[#F0FDF4] h-24"></div>
              <div className="px-6 pb-6 relative">
                <div className="absolute -top-12 left-6 w-24 h-24 bg-white rounded-full p-1 shadow-md">
                  <div className="w-full h-full bg-[#14532D] rounded-full flex items-center justify-center text-3xl text-white font-bold">
                    {user?.fullName?.charAt(0)}
                  </div>
                </div>
                <div className="pt-14">
                  <h2 className="text-xl font-bold text-gray-800">{user?.fullName}</h2>
                  <p className="text-sm text-gray-500 mb-4">{user?.targetRole}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">College</span>
                      <span className="font-medium text-gray-800">{user?.college || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Branch</span>
                      <span className="font-medium text-gray-800">{user?.branch || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Year</span>
                      <span className="font-medium text-gray-800">{user?.yearOfStudy || '-'}</span>
                    </div>
                  </div>
                  
                  <Link to="/profile" className="mt-6 w-full block text-center py-2 bg-gray-50 hover:bg-gray-100 text-[#14532D] font-semibold rounded-lg transition-colors">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
      
      {/* Floating Agent Button */}
      <Link to="/agent" className="fixed bottom-8 right-8 w-16 h-16 bg-[#EF4444] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 hover:bg-red-600 transition-all z-40 group">
        <Bot size={30} />
        <span className="absolute right-full mr-4 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Talk to Agent
        </span>
      </Link>
    </div>
  );
};

export default Dashboard;
