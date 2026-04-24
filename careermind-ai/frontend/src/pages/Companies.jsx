import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Users, Briefcase, Star, Search, ExternalLink, ChevronDown, ChevronUp, FileCheck, X, UploadCloud, Loader2, Map } from 'lucide-react';
import api from '../api/axios';

const COMPANIES = [
  {
    name: 'Google (Alphabet)',
    logoUrl: 'https://logo.clearbit.com/google.com',
    website: 'https://www.google.com',
    location: 'Bangalore, Hyderabad',
    employees: '1,90,000+',
    rating: 4.5,
    type: 'Product',
    careers: 'https://careers.google.com',
    description: 'Works on search engine, AI, cloud, ads; hires via coding + system design interviews',
    color: 'from-blue-500/20 to-green-500/20',
    jobs: [
      { title: 'Software Engineer (L3/L4)', type: 'Full-time', skills: ['DSA', 'System Design', 'C++/Java/Python', 'Distributed Systems'] },
      { title: 'ML Engineer', type: 'Full-time', skills: ['TensorFlow', 'PyTorch', 'Python', 'Linear Algebra', 'NLP'] },
    ]
  },
  {
    name: 'Microsoft',
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
    website: 'https://www.microsoft.com',
    location: 'Hyderabad, Noida, Bangalore',
    employees: '2,20,000+',
    rating: 4.4,
    type: 'Product',
    careers: 'https://careers.microsoft.com',
    description: 'Builds software, cloud (Azure), AI; roles in development, research, cloud services',
    color: 'from-blue-600/20 to-indigo-600/20',
    jobs: [
      { title: 'Software Development Engineer', type: 'Full-time', skills: ['C#/.NET', 'Azure', 'DSA', 'System Design'] },
      { title: 'Data Scientist', type: 'Full-time', skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'] },
    ]
  },
  {
    name: 'Amazon',
    logoUrl: 'https://logo.clearbit.com/amazon.com',
    website: 'https://www.amazon.com',
    location: 'Bangalore, Hyderabad, Chennai',
    employees: '1,50,000+ (India)',
    rating: 4.1,
    type: 'Product',
    careers: 'https://www.amazon.jobs',
    description: 'Works on e-commerce, AWS cloud; hires for SDE, operations, support roles',
    color: 'from-orange-500/20 to-yellow-500/20',
    jobs: [
      { title: 'SDE I / SDE II', type: 'Full-time', skills: ['DSA', 'Java/C++', 'System Design', 'AWS', 'Leadership Principles'] },
      { title: 'Cloud Support Engineer', type: 'Full-time', skills: ['AWS', 'Linux', 'Networking', 'Python/Bash'] },
    ]
  },
  {
    name: 'Flipkart',
    logoUrl: 'https://logo.clearbit.com/flipkart.com',
    website: 'https://www.flipkart.com',
    location: 'Bangalore',
    employees: '50,000+',
    rating: 4.0,
    type: 'Product',
    careers: 'https://www.flipkartcareers.com',
    description: 'Online shopping platform; works on logistics, tech, data',
    color: 'from-blue-500/20 to-yellow-400/20',
    jobs: [
      { title: 'SDE 1 / SDE 2', type: 'Full-time', skills: ['Java', 'Spring Boot', 'DSA', 'Microservices', 'Kafka'] },
      { title: 'Data Engineer', type: 'Full-time', skills: ['Spark', 'Hadoop', 'SQL', 'Python', 'Airflow'] },
    ]
  },
  {
    name: 'Tata Consultancy Services (TCS)',
    logoUrl: 'https://logo.clearbit.com/tcs.com',
    website: 'https://www.tcs.com',
    location: 'Mumbai, Chennai, Pune, All India',
    employees: '6,00,000+',
    rating: 3.8,
    type: 'Service',
    careers: 'https://www.tcs.com/careers',
    description: 'Provides IT services, consulting, software solutions to global clients',
    color: 'from-indigo-600/20 to-blue-700/20',
    jobs: [
      { title: 'System Engineer', type: 'Full-time', skills: ['Java', 'Python', 'SQL', 'Agile', 'Cloud Basics'] },
      { title: 'Digital Lead', type: 'Full-time', skills: ['DevOps', 'AWS/Azure', 'Kubernetes', 'CI/CD'] },
    ]
  },
  {
    name: 'Infosys',
    logoUrl: 'https://logo.clearbit.com/infosys.com',
    website: 'https://www.infosys.com',
    location: 'Bangalore, Mysore, Pune, All India',
    employees: '3,50,000+',
    rating: 3.7,
    type: 'Service',
    careers: 'https://www.infosys.com/careers',
    description: 'Works on digital services, consulting, outsourcing projects',
    color: 'from-blue-500/20 to-cyan-600/20',
    jobs: [
      { title: 'Systems Engineer', type: 'Full-time', skills: ['Java', 'Python', 'SQL', 'DBMS', 'Networking'] },
      { title: 'Technology Analyst', type: 'Full-time', skills: ['Full Stack', 'Cloud', 'Microservices', 'React/Angular'] },
    ]
  },
  {
    name: 'Wipro',
    logoUrl: 'https://logo.clearbit.com/wipro.com',
    website: 'https://www.wipro.com',
    location: 'Bangalore, Hyderabad, Chennai',
    employees: '2,50,000+',
    rating: 3.6,
    type: 'Service',
    careers: 'https://careers.wipro.com',
    description: 'IT services, cloud, consulting, business solutions',
    color: 'from-purple-500/20 to-indigo-500/20',
    jobs: [
      { title: 'Project Engineer', type: 'Full-time', skills: ['Java', '.NET', 'SQL', 'Testing', 'SDLC'] },
      { title: 'Cloud Engineer', type: 'Full-time', skills: ['AWS', 'Azure', 'Terraform', 'Docker', 'Linux'] },
    ]
  },
  {
    name: 'Razorpay',
    logoUrl: 'https://logo.clearbit.com/razorpay.com',
    website: 'https://razorpay.com',
    location: 'Bangalore',
    employees: '3,000+',
    rating: 4.3,
    type: 'Fintech',
    careers: 'https://razorpay.com/jobs',
    description: 'Provides payment gateway and financial solutions for businesses',
    color: 'from-blue-600/20 to-blue-800/20',
    jobs: [
      { title: 'Backend Engineer', type: 'Full-time', skills: ['Go/Java', 'Microservices', 'Kafka', 'PostgreSQL', 'System Design'] },
      { title: 'Frontend Engineer', type: 'Full-time', skills: ['React', 'TypeScript', 'GraphQL', 'CSS-in-JS'] },
    ]
  },
  {
    name: 'PhonePe',
    logoUrl: 'https://logo.clearbit.com/phonepe.com',
    website: 'https://www.phonepe.com',
    location: 'Bangalore',
    employees: '5,000+',
    rating: 4.2,
    type: 'Fintech',
    careers: 'https://www.phonepe.com/careers',
    description: 'Digital payments (UPI), financial services app',
    color: 'from-purple-600/20 to-indigo-700/20',
    jobs: [
      { title: 'SDE (Backend)', type: 'Full-time', skills: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'MySQL'] },
      { title: 'Mobile Developer', type: 'Full-time', skills: ['Kotlin', 'Swift', 'Flutter', 'React Native'] },
    ]
  },
  {
    name: 'Swiggy',
    logoUrl: 'https://logo.clearbit.com/swiggy.com',
    website: 'https://www.swiggy.com',
    location: 'Bangalore',
    employees: '6,000+',
    rating: 4.0,
    type: 'Product',
    careers: 'https://careers.swiggy.com',
    description: 'Food delivery + logistics platform',
    color: 'from-orange-500/20 to-orange-600/20',
    jobs: [
      { title: 'SDE II', type: 'Full-time', skills: ['Java/Kotlin', 'Microservices', 'DSA', 'System Design', 'AWS'] },
      { title: 'ML Engineer', type: 'Full-time', skills: ['Python', 'TensorFlow', 'Recommendation Systems', 'NLP'] },
    ]
  },
  {
    name: 'Zerodha',
    logoUrl: 'https://logo.clearbit.com/zerodha.com',
    website: 'https://zerodha.com',
    location: 'Bangalore',
    employees: '1,500+',
    rating: 4.5,
    type: 'Fintech',
    careers: 'https://careers.zerodha.com',
    description: 'Stock trading and investment platform',
    color: 'from-red-500/20 to-pink-500/20',
    jobs: [
      { title: 'Go Developer', type: 'Full-time', skills: ['Go', 'PostgreSQL', 'Redis', 'Linux', 'System Design'] },
      { title: 'Frontend Developer', type: 'Full-time', skills: ['Vue.js', 'JavaScript', 'CSS', 'Performance Optimization'] },
    ]
  },
  {
    name: 'Meesho',
    logoUrl: 'https://logo.clearbit.com/meesho.com',
    website: 'https://www.meesho.com',
    location: 'Bangalore',
    employees: '2,500+',
    rating: 4.1,
    type: 'Product',
    careers: 'https://careers.meesho.com',
    description: 'Reselling and online marketplace platform',
    color: 'from-pink-500/20 to-rose-500/20',
    jobs: [
      { title: 'SDE (Full Stack)', type: 'Full-time', skills: ['React', 'Node.js', 'Java', 'MongoDB', 'System Design'] },
      { title: 'Data Scientist', type: 'Full-time', skills: ['Python', 'ML', 'Deep Learning', 'SQL', 'Statistics'] },
    ]
  },
  {
    name: 'Atlassian',
    logoUrl: 'https://logo.clearbit.com/atlassian.com',
    website: 'https://www.atlassian.com',
    location: 'Bangalore',
    employees: '10,000+',
    rating: 4.4,
    type: 'Product',
    careers: 'https://www.atlassian.com/company/careers',
    description: 'Builds tools like Jira, Confluence for teams',
    color: 'from-blue-600/20 to-indigo-500/20',
    jobs: [
      { title: 'Software Engineer', type: 'Full-time', skills: ['Java', 'React', 'AWS', 'Microservices', 'Agile'] },
      { title: 'Site Reliability Engineer', type: 'Full-time', skills: ['Kubernetes', 'Terraform', 'Python', 'Monitoring', 'AWS'] },
    ]
  },
  {
    name: 'Adobe',
    logoUrl: 'https://logo.clearbit.com/adobe.com',
    website: 'https://www.adobe.com',
    location: 'Noida, Bangalore',
    employees: '28,000+',
    rating: 4.4,
    type: 'Product',
    careers: 'https://careers.adobe.com',
    description: 'Creative tools (Photoshop), cloud software',
    color: 'from-red-600/20 to-red-700/20',
    jobs: [
      { title: 'Computer Scientist', type: 'Full-time', skills: ['C++', 'DSA', 'System Design', 'AI/ML', 'Graphics'] },
      { title: 'Full Stack Developer', type: 'Full-time', skills: ['React', 'Node.js', 'Java', 'AWS', 'TypeScript'] },
    ]
  },
  {
    name: 'Paytm (One97)',
    logoUrl: 'https://logo.clearbit.com/paytm.com',
    website: 'https://paytm.com',
    location: 'Noida, Bangalore',
    employees: '10,000+',
    rating: 3.8,
    type: 'Fintech',
    careers: 'https://paytm.com/careers',
    description: 'Payments, banking, wallet services',
    color: 'from-blue-500/20 to-cyan-500/20',
    jobs: [
      { title: 'Backend Developer', type: 'Full-time', skills: ['Java', 'Go', 'MySQL', 'Redis', 'Microservices'] },
      { title: 'Android Developer', type: 'Full-time', skills: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Retrofit'] },
    ]
  },
  {
    name: 'Ola',
    logoUrl: 'https://logo.clearbit.com/olacabs.com',
    website: 'https://www.olacabs.com',
    location: 'Bangalore',
    employees: '8,000+',
    rating: 3.9,
    type: 'Product',
    careers: 'https://careers.olacabs.com',
    description: 'Ride-hailing and transport services',
    color: 'from-green-500/20 to-lime-500/20',
    jobs: [
      { title: 'SDE II (Maps)', type: 'Full-time', skills: ['C++', 'Algorithms', 'Graph Theory', 'Geo-spatial Data'] },
      { title: 'iOS Developer', type: 'Full-time', skills: ['Swift', 'UIKit', 'CoreLocation', 'MVVM'] },
    ]
  },
  {
    name: 'CRED',
    logoUrl: 'https://logo.clearbit.com/cred.club',
    website: 'https://cred.club',
    location: 'Bangalore',
    employees: '1,500+',
    rating: 4.3,
    type: 'Fintech',
    careers: 'https://careers.cred.club',
    description: 'Credit card payments and rewards platform',
    color: 'from-gray-700/20 to-gray-900/20',
    jobs: [
      { title: 'Backend Engineer', type: 'Full-time', skills: ['Java/Kotlin', 'Spring Boot', 'PostgreSQL', 'Kafka', 'System Design'] },
      { title: 'iOS Engineer', type: 'Full-time', skills: ['Swift', 'SwiftUI', 'Core Animation', 'Design Systems'] },
    ]
  },
  {
    name: 'Zomato',
    logoUrl: 'https://logo.clearbit.com/zomato.com',
    website: 'https://www.zomato.com',
    location: 'Gurgaon',
    employees: '5,000+',
    rating: 4.0,
    type: 'Product',
    careers: 'https://www.zomato.com/careers',
    description: 'Food delivery + restaurant discovery',
    color: 'from-red-500/20 to-rose-600/20',
    jobs: [
      { title: 'SDE (Backend)', type: 'Full-time', skills: ['Python/Go', 'Django/Flask', 'Redis', 'MySQL', 'AWS'] },
      { title: 'Frontend Engineer', type: 'Full-time', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    ]
  },
  {
    name: 'HCLTech',
    logoUrl: 'https://logo.clearbit.com/hcltech.com',
    website: 'https://www.hcltech.com',
    location: 'Noida, Chennai, All India',
    employees: '2,25,000+',
    rating: 3.7,
    type: 'Service',
    careers: 'https://www.hcltech.com/careers',
    description: 'IT services, engineering, digital transformation',
    color: 'from-blue-700/20 to-blue-900/20',
    jobs: [
      { title: 'Software Engineer', type: 'Full-time', skills: ['Java', '.NET', 'SQL', 'Cloud', 'SDLC'] },
      { title: 'SAP Consultant', type: 'Full-time', skills: ['SAP ABAP', 'SAP HANA', 'S/4HANA', 'FICO/MM'] },
    ]
  },
  {
    name: 'Tech Mahindra',
    logoUrl: 'https://logo.clearbit.com/techmahindra.com',
    website: 'https://www.techmahindra.com',
    location: 'Pune, Hyderabad, All India',
    employees: '1,50,000+',
    rating: 3.6,
    type: 'Service',
    careers: 'https://careers.techmahindra.com',
    description: 'Telecom, IT services, consulting',
    color: 'from-red-600/20 to-orange-500/20',
    jobs: [
      { title: 'Associate Software Engineer', type: 'Full-time', skills: ['Java', 'Python', 'SQL', 'HTML/CSS', 'Testing'] },
      { title: '5G Network Engineer', type: 'Full-time', skills: ['5G NR', 'Networking', 'Telecom', 'Linux', 'Python'] },
    ]
  },
];

const Companies = () => {
  useEffect(() => {
    localStorage.setItem('visited_companies', 'true');
  }, []);

  const [search, setSearch] = useState('');
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [filter, setFilter] = useState('All');
  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [selectedAtsCompany, setSelectedAtsCompany] = useState(null);
  const [atsState, setAtsState] = useState('idle'); // idle, scanning, result
  const [atsScore, setAtsScore] = useState(0);

  // Roadmap state
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [selectedRoadmapCompany, setSelectedRoadmapCompany] = useState(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [roadmapError, setRoadmapError] = useState('');

  const openRoadmapModal = async (company) => {
    setSelectedRoadmapCompany(company);
    setRoadmapModalOpen(true);
    setRoadmapLoading(true);
    setRoadmapData(null);
    setRoadmapError('');

    try {
      const roles = company.jobs.map(j => j.title).join(', ');
      const res = await api.post('/agent/roadmap', {
        companyName: company.name,
        companyType: company.type,
        roles,
      });
      setRoadmapData(res.data.roadmap);
    } catch (err) {
      console.error('Roadmap fetch error:', err);
      // Use a static fallback if the API call fails (e.g. not logged in)
      setRoadmapData({
        title: `Roadmap to ${company.name}`,
        phases: [
          { name: '📚 Phase 1: Foundations', duration: '4-6 weeks', steps: ['Master DSA fundamentals — arrays, strings, linked lists, trees, graphs', 'Learn Git, Linux basics, and command-line proficiency', 'Pick a primary language (Java/Python/C++) and master it'] },
          { name: '⚙️ Phase 2: Core Skills', duration: '6-8 weeks', steps: [`Study the core tech stack used at ${company.name}`, 'Learn System Design basics — load balancing, caching, databases', 'Build proficiency in frameworks relevant to the role'] },
          { name: '🛠️ Phase 3: Projects & Portfolio', duration: '4-6 weeks', steps: ['Build 2-3 real-world projects showcasing your skills', 'Deploy projects and create a polished GitHub profile', 'Write clear README files and document your work'] },
          { name: '🎯 Phase 4: Interview Prep', duration: '4-6 weeks', steps: ['Solve 150+ LeetCode problems (Easy → Medium → Hard)', 'Practice system design interviews with mock sessions', `Research ${company.name}'s interview format and past questions`] },
          { name: '🚀 Phase 5: Apply & Network', duration: '2-4 weeks', steps: [`Apply through ${company.name}'s careers portal and LinkedIn`, 'Seek employee referrals — they 10x your chances', `Tailor your resume to match ${company.type} company keywords`] },
        ],
        tips: [`${company.name} values problem-solving and clean code`, 'Consistency beats intensity — study daily', 'Join tech communities and attend hackathons'],
      });
    } finally {
      setRoadmapLoading(false);
    }
  };

  const openAtsModal = (company) => {
    setSelectedAtsCompany(company);
    setAtsModalOpen(true);
    setAtsState('idle');
  };

  const handleSimulateAts = () => {
    setAtsState('scanning');
    setTimeout(() => {
      setAtsScore(Math.floor(Math.random() * 30) + 65); // Random score between 65 and 95
      setAtsState('result');
    }, 2500);
  };

  const filtered = COMPANIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.jobs.some(j => j.skills.some(s => s.toLowerCase().includes(search.toLowerCase())));
    const matchesFilter = filter === 'All' || c.type.includes(filter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Top 20 <span className="text-green-600">Companies</span> in India
          </h1>
          <p className="text-lg text-gray-600">Explore job vacancies, required skills, and career opportunities at India's leading tech companies.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by company or skill (e.g. React, Java)..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Product', 'Service', 'Fintech'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border shadow-sm ${
                  filter === f 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-green-300 hover:shadow-xl hover:shadow-green-500/5 transition-all group"
            >
              {/* Company Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md p-2 overflow-hidden border border-gray-100`}>
                      <img 
                        src={company.logoUrl} 
                        alt={`${company.name} logo`} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://ui-avatars.com/api/?name=' + company.name.charAt(0) + '&background=16A34A&color=fff';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">{company.name}</h3>
                      <div className="flex flex-col gap-1 mt-1">
                        <span className="flex items-center gap-1 text-sm text-gray-500"><MapPin size={12} /> {company.location}</span>
                        <p className="text-xs text-gray-600 mt-1 max-w-[280px] sm:max-w-xs">{company.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                      <Star size={14} fill="currentColor" /> {company.rating}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      company.type.includes('Product') ? 'bg-green-100 text-green-700 border border-green-200' :
                      company.type.includes('Fintech') ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}>
                      {company.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600 mb-4 font-medium">
                  <span className="flex items-center gap-1"><Users size={12} className="text-green-600" /> {company.employees}</span>
                  <span className="flex items-center gap-1"><Briefcase size={12} className="text-green-600" /> {company.jobs.length} Open Roles</span>
                </div>

                {/* Job Roles */}
                <div className="space-y-3">
                  {company.jobs.slice(0, expandedCompany === i ? company.jobs.length : 2).map((job, j) => (
                    <div key={j} className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-green-200 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-gray-800">{job.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          job.type === 'Internship' ? 'bg-purple-100 text-purple-700' :
                          job.type === 'Fresher' ? 'bg-cyan-100 text-cyan-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.map((skill, k) => (
                          <span key={k} className="text-[11px] px-2 py-0.5 bg-white text-gray-600 rounded-md border border-gray-200 font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {company.jobs.length > 2 && (
                  <button 
                    onClick={() => setExpandedCompany(expandedCompany === i ? null : i)}
                    className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-bold mt-3 transition-colors"
                  >
                    {expandedCompany === i ? <><ChevronUp size={14} /> Show Less</> : <><ChevronDown size={14} /> Show All {company.jobs.length} Roles</>}
                  </button>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openAtsModal(company)}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-green-600 hover:border-green-300 hover:scale-105 transition-all shadow-sm"
                  >
                    <FileCheck size={14} /> Match ATS Resume
                  </button>
                  <button 
                    onClick={() => openRoadmapModal(company)}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:scale-105 transition-all shadow-sm"
                  >
                    <Map size={14} /> Road Map
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-green-600 hover:scale-105 transition-all"
                  >
                    <ExternalLink size={12} /> Website
                  </a>
                  <a 
                    href={company.careers} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 hover:scale-105 transition-all"
                  >
                    <ExternalLink size={12} /> Apply Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-medium">No companies match your search. Try a different keyword.</p>
          </div>
        )}

        {/* ATS Modal */}
        <AnimatePresence>
          {atsModalOpen && selectedAtsCompany && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100"
              >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-3">
                    <img src={selectedAtsCompany.logoUrl} className="w-8 h-8 object-contain" alt="logo" />
                    <h3 className="text-lg font-bold text-gray-900">ATS Resume Check</h3>
                  </div>
                  <button onClick={() => setAtsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  {atsState === 'idle' && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                        <UploadCloud size={32} />
                      </div>
                      <h4 className="text-gray-900 font-bold">Match Resume for {selectedAtsCompany.name}</h4>
                      <p className="text-sm text-gray-500 px-4">Upload your resume to see how well it matches the ATS requirements for roles at {selectedAtsCompany.name}.</p>
                      
                      <button 
                        onClick={handleSimulateAts}
                        className="w-full mt-2 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors shadow-sm"
                      >
                        Select Resume from Profile
                      </button>
                    </div>
                  )}

                  {atsState === 'scanning' && (
                    <div className="text-center space-y-4 py-8">
                      <Loader2 size={40} className="text-green-500 animate-spin mx-auto" />
                      <h4 className="text-gray-900 font-bold">Scanning with AI...</h4>
                      <p className="text-sm text-gray-500">Checking keywords, formatting, and requirements against {selectedAtsCompany.name}'s standard ATS filters.</p>
                    </div>
                  )}

                  {atsState === 'result' && (
                    <div className="text-center space-y-6">
                      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                          <motion.circle 
                            initial={{ strokeDasharray: '0 283' }}
                            animate={{ strokeDasharray: `${(atsScore / 100) * 283} 283` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="50" cy="50" r="45" fill="none" 
                            stroke={atsScore >= 80 ? '#16a34a' : atsScore >= 70 ? '#f59e0b' : '#ef4444'} 
                            strokeWidth="8" strokeLinecap="round" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-3xl font-black ${atsScore >= 80 ? 'text-green-600' : atsScore >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {atsScore}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Score</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-gray-900 font-bold text-lg">
                          {atsScore >= 80 ? 'Excellent Match! 🎉' : atsScore >= 70 ? 'Good Match 👍' : 'Needs Improvement ⚠️'}
                        </h4>
                        <p className="text-sm text-gray-500 mt-2">
                          Your resume matches {atsScore}% of the typical requirements for roles at {selectedAtsCompany.name}.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl text-left">
                        <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">Suggestions to improve</h5>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                          <li>Add more keywords specific to {selectedAtsCompany.type} roles.</li>
                          <li>Quantify your achievements using metrics.</li>
                          <li>Ensure formatting is clean and parsable.</li>
                        </ul>
                      </div>

                      <button 
                        onClick={() => setAtsModalOpen(false)}
                        className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Roadmap Modal */}
        <AnimatePresence>
          {roadmapModalOpen && selectedRoadmapCompany && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 max-h-[85vh] flex flex-col"
              >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Map size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Career Road Map</h3>
                      <p className="text-xs text-gray-500">{selectedRoadmapCompany.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setRoadmapModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                  {roadmapLoading && (
                    <div className="text-center space-y-4 py-12">
                      <Loader2 size={40} className="text-blue-500 animate-spin mx-auto" />
                      <h4 className="text-gray-900 font-bold">Generating Road Map...</h4>
                      <p className="text-sm text-gray-500">AI is creating a personalized roadmap for {selectedRoadmapCompany.name}</p>
                    </div>
                  )}

                  {!roadmapLoading && roadmapData && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-gray-900">{roadmapData.title}</h4>

                      {roadmapData.phases?.map((phase, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-100 rounded-2xl p-4 hover:border-blue-200 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-bold text-gray-800">{phase.name}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">{phase.duration}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {phase.steps?.map((step, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2 text-xs text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}

                      {roadmapData.tips?.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-2">
                          <h5 className="text-xs font-bold text-amber-800 uppercase mb-2">💡 Pro Tips</h5>
                          <ul className="space-y-1">
                            {roadmapData.tips.map((tip, tIdx) => (
                              <li key={tIdx} className="text-xs text-amber-700 flex items-start gap-2">
                                <span className="shrink-0">•</span> {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <button 
                        onClick={() => setRoadmapModalOpen(false)}
                        className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors mt-2"
                      >
                        Got It!
                      </button>
                    </div>
                  )}

                  {!roadmapLoading && roadmapError && (
                    <div className="text-center py-8">
                      <p className="text-red-500 font-medium">{roadmapError}</p>
                      <button 
                        onClick={() => setRoadmapModalOpen(false)}
                        className="mt-4 px-6 py-2 bg-gray-100 rounded-xl text-gray-700 font-bold hover:bg-gray-200 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Companies;
