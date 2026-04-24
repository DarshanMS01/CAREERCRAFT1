import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Calendar as CalendarIcon, CheckCircle, 
  TrendingUp, Award, PlayCircle, BookOpen, Flame
} from 'lucide-react';

const ProgressTracker = () => {
  // Real-time tracking states
  const [hoursSpent, setHoursSpent] = useState("0.0");
  const [progressData, setProgressData] = useState([]);
  const [calendarActivity, setCalendarActivity] = useState([]);

  useEffect(() => {
    // 1. Calculate and update time spent
    const startTime = localStorage.getItem('careercraft_session_start');
    if (!startTime) {
      localStorage.setItem('careercraft_session_start', Date.now().toString());
    }

    const updateTime = () => {
      const start = parseInt(localStorage.getItem('careercraft_session_start') || Date.now());
      // Also add previous sessions time if we want, but keeping it simple to this browser
      const diffInSeconds = (Date.now() - start) / 1000;
      const hours = (diffInSeconds / 3600).toFixed(2);
      setHoursSpent(hours);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    // 2. Fetch real-time visits from other pages (assuming they write to localStorage)
    // For demonstration, we'll check localStorage keys we've set across the app
    const visitedCompanies = localStorage.getItem('visited_companies') === 'true';
    const visitedCourses = localStorage.getItem('visited_courses') === 'true';
    const visitedAgent = localStorage.getItem('visited_agent') === 'true';
    const completedMockInterview = localStorage.getItem('completed_mock') === 'true';

    // Build the dynamic real-time table
    const realTimeTable = [
      { 
        id: 1, 
        topic: 'Explore Top Companies', 
        status: visitedCompanies ? 'Visited' : 'Not Visited', 
        type: 'Exploration',
        isComplete: visitedCompanies 
      },
      { 
        id: 2, 
        topic: 'Browse Courses', 
        status: visitedCourses ? 'Visited' : 'Not Visited', 
        type: 'Learning',
        isComplete: visitedCourses
      },
      { 
        id: 3, 
        topic: 'Talk to AI Agent', 
        status: visitedAgent ? 'Visited' : 'Not Visited', 
        type: 'AI Chatbot',
        isComplete: visitedAgent
      },
      { 
        id: 4, 
        topic: 'Mock Interview Practice', 
        status: completedMockInterview ? 'Completed' : 'Not Visited', 
        type: 'Interview',
        isComplete: completedMockInterview
      },
      { 
        id: 5, 
        topic: 'Data Structures Module 1', 
        status: localStorage.getItem('course_dsa_1') ? 'Completed' : 'In Progress', 
        type: 'Course',
        isComplete: localStorage.getItem('course_dsa_1') === 'true'
      },
    ];

    setProgressData(realTimeTable);

    // 3. Generate real-time calendar heatmap
    const todayStr = new Date().toDateString();
    let logs = JSON.parse(localStorage.getItem('careercraft_activity_log') || '[]');
    if (!logs.includes(todayStr)) {
      logs.push(todayStr);
      localStorage.setItem('careercraft_activity_log', JSON.stringify(logs));
    }

    const heatmap = Array.from({ length: 14 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      const isVisited = logs.includes(d.toDateString());
      
      return {
        date: d.toLocaleDateString('en-US', { weekday: 'short' }),
        hours: isVisited ? (i === 13 ? 2 : 1) : 0 // Mock 2 hours for today if active, 1 for past active days
      };
    });

    setCalendarActivity(heatmap);

    return () => clearInterval(interval);
  }, []);

  const completedTasks = progressData.filter(d => d.isComplete || d.status === 'Completed' || d.status === 'Visited').length;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <TrendingUp className="text-green-600" size={32} /> Your Progress Tracker
            </h1>
            <p className="text-gray-500 mt-1">Real-time tracking of your website visits and course completions.</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
            <Flame className="text-orange-500" size={24} />
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Current Streak</p>
              <p className="text-lg font-extrabold text-gray-900">1 Days</p>
            </div>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Real-Time Hours Spent</p>
                <h3 className="text-3xl font-black text-gray-900">{hoursSpent} <span className="text-lg text-gray-400 font-medium">hrs</span></h3>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle size={28} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Pages/Tasks Visited</p>
                <h3 className="text-3xl font-black text-gray-900">{completedTasks} <span className="text-lg text-gray-400 font-medium">/ 5</span></h3>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Award size={28} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Status</p>
                <h3 className="text-3xl font-black text-gray-900">Active</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real-time Tracking Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="text-green-600" size={20} /> Real-Time Activity Log
            </h3>
            <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-lg animate-pulse">
              Live Updates
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Page / Course Name</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {progressData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{item.topic}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        item.type === 'Course' || item.type === 'Learning' ? 'bg-blue-50 text-blue-700' :
                        item.type === 'AI Chatbot' ? 'bg-purple-50 text-purple-700' :
                        'bg-orange-50 text-orange-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full inline-flex ${
                        item.status === 'Visited' || item.status === 'Completed' 
                          ? 'bg-green-50 text-green-700 border border-green-200' 
                          : item.status === 'In Progress' 
                            ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}>
                        {(item.status === 'Visited' || item.status === 'Completed') && <CheckCircle size={14} />}
                        {item.status === 'In Progress' && <PlayCircle size={14} />}
                        {item.status === 'Not Visited' && <div className="w-2 h-2 rounded-full bg-gray-400"></div>}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Calendar (Heatmap style) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="text-green-600" size={20} /> 14-Day Visit Calendar
            </h3>
          </div>
          <div className="flex items-end gap-2 h-40">
            {calendarActivity.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full relative flex justify-center h-full items-end">
                  <div 
                    className={`w-full rounded-md transition-all ${
                      day.hours === 0 ? 'bg-gray-100' :
                      day.hours === 1 ? 'bg-green-300' : 'bg-green-600'
                    }`}
                    style={{ height: `${Math.max((day.hours / 2) * 100, 15)}%` }}
                  ></div>
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap transition-opacity pointer-events-none z-10">
                    {day.hours > 0 ? 'Active Visit' : 'No Visit'} on {day.date}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{day.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProgressTracker;
