import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Users, Briefcase, Calendar, MapPin } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/seed');
      fetchUsers();
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#14532D]">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage users and activity across the CareerMind AI platform.</p>
          </div>
          <button 
            onClick={seedDatabase}
            className="bg-[#16A34A] hover:bg-[#22C55E] text-white px-4 py-2 rounded-lg font-medium shadow transition-colors"
          >
            Seed Sample Users
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A34A]"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl shadow-green-50 overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Education</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Target Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                        No users found. Click 'Seed Sample Users' to add some.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center text-[#16A34A] font-bold text-lg">
                              {user.fullName ? user.fullName.charAt(0) : '?'}
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{user.fullName || 'Unknown'}</div>
                              <div className="text-gray-500 flex items-center gap-1 mt-1">
                                <Mail size={12} /> {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900 flex items-center gap-1">
                            <Users size={14} className="text-gray-400" /> {user.college || 'N/A'}
                          </div>
                          <div className="text-gray-500 mt-1">{user.branch} • {user.yearOfStudy}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
                            <Briefcase size={12} /> {user.targetRole || 'Not Specified'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(user.joinedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          <a 
                            href={`mailto:${user.email}`} 
                            className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-lg flex items-center gap-2 transition-colors w-fit"
                          >
                            <Mail size={16} /> Message User
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
