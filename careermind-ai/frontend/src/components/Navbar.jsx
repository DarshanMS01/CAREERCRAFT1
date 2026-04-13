import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bot, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Notes', path: '/notes' },
    { name: 'Interview Prep', path: '/interview' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#14532D] text-white p-2 rounded-xl group-hover:bg-[#16A34A] transition-colors">
              <Bot size={24} />
            </div>
            <span className="font-bold text-2xl text-[#14532D] tracking-tight">
              CareerMind <span className="text-[#16A34A]">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#16A34A] ${location.pathname === link.path ? 'text-[#16A34A]' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User / Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/agent" className="flex items-center gap-2 text-sm font-semibold text-white bg-[#EF4444] px-4 py-2 rounded-full hover:bg-red-600 transition-all shadow-md shadow-red-500/20 hover:shadow-red-500/40">
                  <Bot size={18} /> Talk to AI Agent
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-[#16A34A] font-medium text-sm">Dashboard</Link>
                <div className="relative group cursor-pointer">
                  <Link to="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F0FDF4] text-[#14532D] border border-[#16A34A]/20 hover:bg-[#16A34A] hover:text-white transition-colors">
                    <User size={20} />
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 border-b border-gray-50 text-sm">
                      <p className="font-semibold text-gray-800">{user.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-xl">
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#16A34A] transition-colors">Log In</Link>
                <Link to="/register" className="text-sm font-semibold text-white bg-[#16A34A] px-5 py-2.5 rounded-full hover:bg-green-600 transition-all shadow-md shadow-green-500/20 hover:shadow-green-500/40">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-500 hover:text-[#14532D] focus:outline-none">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium px-2 py-2 rounded-lg ${location.pathname === link.path ? 'bg-[#F0FDF4] text-[#16A34A]' : 'text-gray-600'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4 flex flex-col space-y-3 px-2">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium py-2">Dashboard</Link>
                    <Link to="/agent" onClick={() => setMobileMenuOpen(false)} className="text-center font-semibold text-white bg-[#EF4444] px-4 py-2.5 rounded-full">Talk to AI Agent</Link>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-left py-2 font-medium text-red-600">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center font-medium text-[#14532D] border border-gray-200 py-2.5 rounded-full">Log In</Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center font-semibold text-white bg-[#16A34A] py-2.5 rounded-full">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
