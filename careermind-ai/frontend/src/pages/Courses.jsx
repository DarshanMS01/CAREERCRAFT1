import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, User, Award, CheckCircle } from 'lucide-react';

const Courses = () => {
  const coursesList = [
    { title: "Full Stack Web Development (MERN)", duration: "12 weeks", instructor: "Sarah Dev", rating: 4.9, tags: ["Popular", "Limited Seats"], isHot: true },
    { title: "DSA Mastery for Interviews", duration: "8 weeks", instructor: "Alex Algo", rating: 4.8, tags: ["Must Have"], isHot: false },
    { title: "System Design for SDE Roles", duration: "6 weeks", instructor: "Priya System", rating: 4.9, tags: ["Advanced"], isHot: true },
    { title: "AI & Machine Learning Fundamentals", duration: "10 weeks", instructor: "Dr. Alan", rating: 4.7, tags: ["Trending"], isHot: false },
    { title: "Aptitude & Reasoning Crash Course", duration: "4 weeks", instructor: "Rahul Math", rating: 4.6, tags: ["Beginner"], isHot: false },
    { title: "Soft Skills & Communication", duration: "3 weeks", instructor: "Emma Comm", rating: 4.8, tags: ["HR Round"], isHot: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#14532D] mb-4">Top-Rated <span className="text-[#16A34A]">Courses</span></h1>
          <p className="text-lg text-gray-600">Upgrade your skills with industry-relevant courses designed for cracking product-based companies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesList.map((course, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#16A34A]/5 transition-all group flex flex-col h-full relative"
            >
              {course.isHot && (
                <div className="absolute top-4 right-4 z-10 bg-[#EF4444] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse">
                  Limited Seats
                </div>
              )}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                {/* Course cover placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#14532D]/80 to-[#16A34A]/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex gap-2">
                    {course.tags.map((tag, j) => (
                      <span key={j} className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                  <Award size={40} className="opacity-50" />
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#16A34A] transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock size={16} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><User size={16} /> {course.instructor}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-400 font-bold">
                    <Star size={18} fill="currentColor" />
                    <span className="text-gray-700">{course.rating}</span>
                  </div>
                  <button className="px-5 py-2.5 bg-[#16A34A] text-white font-semibold rounded-xl hover:bg-[#22C55E] transition-colors shadow-md shadow-green-500/20">
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
