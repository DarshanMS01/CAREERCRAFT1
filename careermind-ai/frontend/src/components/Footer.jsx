import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#14532D] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 border-r-0 md:border-r border-white/10 pr-8">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-white/10 text-white p-2 rounded-xl">
                <Bot size={24} />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                CareerMind <span className="text-[#22C55E]">AI</span>
              </span>
            </Link>
            <p className="text-[#F0FDF4]/70 text-sm mb-6 leading-relaxed">
              Your AI-Powered Career Advisor. Get job-ready with AI mock interviews, curated notes, and expert courses designed for engineering students.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">Twitter</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">LinkedIn</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">GitHub</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#F0FDF4]">Features</h4>
            <ul className="space-y-3 text-sm text-[#F0FDF4]/70">
              <li><Link to="/agent" className="hover:text-white transition-colors">AI Career Advisor</Link></li>
              <li><Link to="/interview" className="hover:text-white transition-colors">Mock Interviews</Link></li>
              <li><Link to="/notes" className="hover:text-white transition-colors">Engineering Notes</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Premium Courses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#F0FDF4]">Resources</h4>
            <ul className="space-y-3 text-sm text-[#F0FDF4]/70">
              <li><Link to="/notes/dsa" className="hover:text-white transition-colors">DSA Cheatsheet</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Resume Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Top HR Questions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#F0FDF4]">Contact Us</h4>
            <ul className="space-y-3 text-sm text-[#F0FDF4]/70">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#22C55E]" /> hello@careermind.ai
              </li>
              <li>1-800-CAREER-AI</li>
              <li className="mt-4 pt-4 border-t border-white/10">
                <p className="mb-2 text-xs">Subscribe to our newsletter</p>
                <div className="flex">
                  <input type="email" placeholder="Email address" className="bg-white/10 text-sm px-3 py-2 rounded-l-lg outline-none focus:bg-white/20 text-white w-full placeholder:text-white/40" />
                  <button className="bg-[#16A34A] hover:bg-[#22C55E] px-3 py-2 rounded-r-lg transition-colors text-sm font-medium">Join</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center bg-[#14532D]">
          <p className="text-sm text-white/50 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CareerMind AI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
