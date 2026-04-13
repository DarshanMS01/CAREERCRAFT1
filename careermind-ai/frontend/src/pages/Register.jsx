import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, User, Mail, Lock, Phone, GraduationCap, Briefcase } from 'lucide-react';

const InputField = ({ label, name, type = "text", icon: Icon, placeholder, required = true, formData, handleChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Icon size={18} />
      </div>
      <input
        name={name}
        type={type}
        required={required}
        className="appearance-none relative block w-full px-3 py-2.5 pl-10 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-[#16A34A] focus:border-[#16A34A] focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', phone: '',
    college: '', branch: '', yearOfStudy: '1st Year', targetRole: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-[#16A34A]/5 border border-gray-100 mt-8"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-[#14532D]">Join CareerMind AI</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-[#16A34A] hover:text-[#22C55E]">Log in</Link>
          </p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-3 flex items-center gap-2 rounded-xl text-sm border border-red-200">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" name="fullName" icon={User} placeholder="John Doe" formData={formData} handleChange={handleChange} />
            <InputField label="Email Address" name="email" type="email" icon={Mail} placeholder="john@example.com" formData={formData} handleChange={handleChange} />
            <InputField label="Password" name="password" type="password" icon={Lock} placeholder="••••••••" formData={formData} handleChange={handleChange} />
            <InputField label="Phone Number" name="phone" icon={Phone} placeholder="+1 234 567 890" formData={formData} handleChange={handleChange} />
            <InputField label="College / University" name="college" icon={GraduationCap} placeholder="MIT" formData={formData} handleChange={handleChange} />
            <InputField label="Branch / Degree" name="branch" icon={GraduationCap} placeholder="Computer Science" formData={formData} handleChange={handleChange} />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className="block w-full px-3 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:ring-[#16A34A] focus:border-[#16A34A] sm:text-sm"
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>Graduate</option>
              </select>
            </div>
            
            <InputField label="Target Job Role" name="targetRole" icon={Briefcase} placeholder="Software Engineer" formData={formData} handleChange={handleChange} />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3.5 px-4 mt-8 border border-transparent text-sm font-bold rounded-xl text-white bg-[#16A34A] hover:bg-[#22C55E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A34A] disabled:opacity-70 shadow-lg shadow-green-500/30 transition-all"
          >
            {isLoading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span> : "Create Account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
