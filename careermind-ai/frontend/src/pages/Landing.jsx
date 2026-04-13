import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, BookOpen, GraduationCap, FileText, CheckCircle, Users, Target, ArrowRight } from 'lucide-react';

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 50); // typing speed
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#16A34A]/10 transition-all group"
  >
    <div className="w-14 h-14 bg-[#F0FDF4] rounded-xl flex items-center justify-center text-[#16A34A] mb-6 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

const Landing = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F0FDF4]/50 to-white">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#16A34A]/5 blur-3xl"></div>
        <div className="absolute top-40 left-0 -ml-40 w-72 h-72 rounded-full bg-[#EF4444]/5 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0FDF4] border border-[#16A34A]/20 text-[#14532D] font-medium text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping"></span>
            CareerMind AI Beta is Live!
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#14532D] tracking-tight mb-6">
            Your <span className="text-[#16A34A]"><TypewriterText text="AI-Powered Career Advisor" /></span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 mb-10"
          >
            Get job-ready with AI mock interviews, curated engineering notes, and expert courses designed to land your dream role.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-[#16A34A] text-white rounded-full font-bold text-lg hover:bg-[#22C55E] transition-all hover:-translate-y-1 shadow-lg shadow-green-500/30 flex items-center justify-center gap-2">
              Start Free <ArrowRight size={20} />
            </Link>
            <Link to="/agent" className="w-full sm:w-auto px-8 py-4 bg-[#EF4444] text-white rounded-full font-bold text-lg hover:bg-red-600 transition-all hover:-translate-y-1 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 relative">
              Talk to AI Agent <Bot size={20} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 border-2 border-white rounded-full animate-bounce"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-4">
              <p className="text-4xl font-extrabold text-[#14532D] mb-2">10,000+</p>
              <p className="text-gray-500 font-medium">Students Enrolled</p>
            </div>
            <div className="p-4 pt-8 md:pt-4">
              <p className="text-4xl font-extrabold text-[#16A34A] mb-2">500+</p>
              <p className="text-gray-500 font-medium">Interview Questions</p>
            </div>
            <div className="p-4 pt-8 md:pt-4">
              <p className="text-4xl font-extrabold text-[#EF4444] mb-2">50+</p>
              <p className="text-gray-500 font-medium">Premium Courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#14532D] mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-500">From learning core concepts to acing the final HR round, we've got you covered.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Bot} 
              title="AI Interview Prep" 
              desc="Practice technical and HR questions with our AI. Get real-time scoring and feedback." 
              delay={0.1}
            />
            <FeatureCard 
              icon={BookOpen} 
              title="Engineering Notes" 
              desc="Access concise, high-quality notes for DSA, OS, DBMS, Networks, and System Design." 
              delay={0.2}
            />
            <FeatureCard 
              icon={GraduationCap} 
              title="Top Courses" 
              desc="Enroll in outcome-driven courses taught by industry experts to cover skill gaps." 
              delay={0.3}
            />
            <FeatureCard 
              icon={FileText} 
              title="Resume Review" 
              desc="Upload your resume and let AI suggest actionable improvements in seconds." 
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#14532D] mb-4">Loved by Engineering Students</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", role: "SDE at Amazon", img: "https://i.pravatar.cc/150?img=11", quote: "The AI agent helped me practice system design interviews. The feedback on my thought process was surprisingly human-like and spot-on!" },
              { name: "Priya M.", role: "Frontend Developer", img: "https://i.pravatar.cc/150?img=5", quote: "I used the Engineering Notes to revise for my finals and then took the React course. Landed an internship right after." },
              { name: "Vikram K.", role: "Analyst", img: "https://i.pravatar.cc/150?img=12", quote: "The resume review tool highlighted keywords I was missing for the role I wanted. CareerMind AI is totally worth it." }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative"
              >
                <div className="absolute top-6 right-6 text-gray-200">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.411 14.182C17.418 11.233 18.017 8.948 18.017 7H14.017V3H22.017V7.126C22.017 9.873 21.055 13.064 19.123 16.697L15.932 21H14.017ZM4.01697 21L6.41097 14.182C7.41797 11.233 8.01697 8.948 8.01697 7H4.01697V3H12.017V7.126C12.017 9.873 11.055 13.064 9.12297 16.697L5.93197 21H4.01697Z" />
                  </svg>
                </div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover shadow-md" />
                  <div>
                    <h4 className="font-bold text-gray-800">{t.name}</h4>
                    <p className="text-sm text-[#16A34A] font-medium">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed relative z-10">"{t.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-[#14532D]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to crack your next interview?</h2>
          <p className="text-[#F0FDF4]/80 text-xl mb-10">Join 10,000+ students taking their careers to the next level.</p>
          <Link to="/register" className="inline-flex py-4 px-10 bg-[#16A34A] hover:bg-[#22C55E] text-white font-bold rounded-full text-lg shadow-xl shadow-green-900/50 transition-all hover:scale-105">
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
