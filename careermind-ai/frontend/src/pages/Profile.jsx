import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, Briefcase, Camera, Save, Trash2 } from 'lucide-react';

const InputField = ({ label, name, icon: Icon, disabled, formData, handleChange, user }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Icon size={18} />
      </div>
      <input
        name={name}
        type="text"
        disabled={disabled}
        className={`appearance-none relative block w-full px-3 py-2.5 pl-10 border ${disabled ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-[#16A34A] focus:border-[#16A34A]'} rounded-xl focus:outline-none sm:text-sm transition-colors`}
        value={disabled && name === 'email' ? user?.email || '' : formData[name] || ''}
        onChange={handleChange}
      />
    </div>
  </div>
);

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    college: user?.college || '',
    branch: user?.branch || '',
    yearOfStudy: user?.yearOfStudy || '',
    targetRole: user?.targetRole || ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    // API call to PUT /api/user/:id would go here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-[#14532D]">My Profile</h1>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="px-5 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-[#16A34A] text-white font-medium rounded-lg hover:bg-[#22C55E] shadow-sm shadow-green-500/20 transition-colors">
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-8">
          <div className="bg-[#14532D] h-32 md:h-48 relative">
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-lg">
                  <div className="w-full h-full bg-[#16A34A] rounded-full flex items-center justify-center text-4xl text-white font-bold">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-md border border-gray-100 hover:bg-gray-50">
                    <Camera size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-20 px-8 md:px-12 pb-12">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="fullName" icon={User} disabled={!isEditing} formData={formData} handleChange={handleChange} user={user} />
                <InputField label="Email Address" name="email" icon={Mail} disabled={true} formData={formData} handleChange={handleChange} user={user} />
                <InputField label="Phone Number" name="phone" icon={Phone} disabled={!isEditing} formData={formData} handleChange={handleChange} user={user} />
                <InputField label="Target Job Role" name="targetRole" icon={Briefcase} disabled={!isEditing} formData={formData} handleChange={handleChange} user={user} />
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Education Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="College / University" name="college" icon={GraduationCap} disabled={!isEditing} formData={formData} handleChange={handleChange} user={user} />
                  <InputField label="Branch / Degree" name="branch" icon={GraduationCap} disabled={!isEditing} formData={formData} handleChange={handleChange} user={user} />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`block w-full px-3 py-2.5 ${!isEditing ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-300 text-gray-900'} rounded-xl focus:outline-none focus:ring-[#16A34A] focus:border-[#16A34A] sm:text-sm`}
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                      <option>Graduate</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-red-800">Danger Zone</h3>
            <p className="text-red-600/80 text-sm mt-1">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-red-600 border border-red-200 font-semibold rounded-xl hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap">
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
