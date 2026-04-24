import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Briefcase, Code, FileText, Wand2, Download, Plus, Trash2, ChevronRight, ChevronLeft, Loader } from 'lucide-react';
import api from '../api/axios';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [resumeData, setResumeData] = useState({
    personal: { fullName: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', location: 'New York, USA', linkedin: 'linkedin.com/in/johndoe', github: 'github.com/johndoe' },
    summary: 'A passionate and results-driven software engineer with experience in building scalable web applications. Adept at collaborating with cross-functional teams to deliver high-quality solutions.',
    education: [{ id: 1, degree: 'B.S. Computer Science', college: 'State University', year: '2023', cgpa: '3.8/4.0' }],
    skills: { technical: 'JavaScript, React, Node.js, Express, MongoDB, Python, SQL', soft: 'Communication, Problem Solving, Teamwork, Leadership' },
    experience: [{ id: 1, company: 'Tech Corp', role: 'Software Engineer Intern', duration: 'May 2022 - Aug 2022', responsibilities: 'Developed REST APIs using Node.js and Express. Improved database query performance by 20%.' }],
    projects: [{ id: 1, title: 'E-Commerce Platform', description: 'Built a full-stack e-commerce app with user authentication and payment gateway integration.', technologies: 'React, Redux, Node.js, MongoDB, Stripe', link: 'github.com/johndoe/ecommerce' }]
  });

  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleEnhanceWithAI = async (type, text, itemIndex = null, section = null) => {
    if (!text.trim()) return alert('Please enter some text to enhance.');
    setIsGenerating(true);
    try {
      const response = await api.post('/resume/enhance', { type, text, additionalData: { role: 'Software Engineer' } });
      const enhanced = response.data.enhancedText;
      
      if (type === 'summary') {
        setResumeData({ ...resumeData, summary: enhanced });
      } else if (type === 'project' && section === 'projects') {
        const newProjects = [...resumeData.projects];
        newProjects[itemIndex].description = enhanced;
        setResumeData({ ...resumeData, projects: newProjects });
      } else if (type === 'project' && section === 'experience') {
        const newExp = [...resumeData.experience];
        newExp[itemIndex].responsibilities = enhanced;
        setResumeData({ ...resumeData, experience: newExp });
      } else if (type === 'skills') {
        setResumeData({ ...resumeData, skills: { ...resumeData.skills, technical: enhanced } });
      }
    } catch (error) {
      console.error(error);
      alert('Failed to enhance text using AI. Try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const [isAiMode, setIsAiMode] = useState(false);
  const [rawText, setRawText] = useState('');
  const [targetCompany, setTargetCompany] = useState('Product-Based (e.g., Google, Amazon)');
  const [isParsing, setIsParsing] = useState(false);

  const handleAiParse = async () => {
    if (!rawText.trim()) return alert('Please paste your resume details first.');
    setIsParsing(true);
    try {
      const response = await api.post('/resume/parse', { rawText, targetCompany });
      const { parsedData } = response.data;
      if (parsedData && parsedData.personal) {
        setResumeData(parsedData);
        setIsAiMode(false); // Switch back to normal view
        setStep(1); // Reset to step 1
      } else {
        alert('Failed to parse the data properly.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to build resume using AI.');
    } finally {
      setIsParsing(false);
    }
  };

  // Generic array update handlers
  const addArrayItem = (section, defaultItem) => {
    setResumeData({ ...resumeData, [section]: [...resumeData[section], { id: Date.now(), ...defaultItem }] });
  };

  const updateArrayItem = (section, index, field, value) => {
    const newArray = [...resumeData[section]];
    newArray[index][field] = value;
    setResumeData({ ...resumeData, [section]: newArray });
  };

  const removeArrayItem = (section, index) => {
    const newArray = resumeData[section].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [section]: newArray });
  };

  const renderFormStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><User className="text-[#16A34A]" /> Personal Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm text-gray-600">Full Name</label><input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16A34A] outline-none" value={resumeData.personal.fullName} onChange={e => setResumeData({...resumeData, personal: {...resumeData.personal, fullName: e.target.value}})} /></div>
              <div><label className="text-sm text-gray-600">Email</label><input type="email" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16A34A] outline-none" value={resumeData.personal.email} onChange={e => setResumeData({...resumeData, personal: {...resumeData.personal, email: e.target.value}})} /></div>
              <div><label className="text-sm text-gray-600">Phone</label><input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16A34A] outline-none" value={resumeData.personal.phone} onChange={e => setResumeData({...resumeData, personal: {...resumeData.personal, phone: e.target.value}})} /></div>
              <div><label className="text-sm text-gray-600">Location</label><input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16A34A] outline-none" value={resumeData.personal.location} onChange={e => setResumeData({...resumeData, personal: {...resumeData.personal, location: e.target.value}})} /></div>
              <div><label className="text-sm text-gray-600">LinkedIn</label><input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16A34A] outline-none" value={resumeData.personal.linkedin} onChange={e => setResumeData({...resumeData, personal: {...resumeData.personal, linkedin: e.target.value}})} /></div>
              <div><label className="text-sm text-gray-600">GitHub / Portfolio</label><input type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#16A34A] outline-none" value={resumeData.personal.github} onChange={e => setResumeData({...resumeData, personal: {...resumeData.personal, github: e.target.value}})} /></div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><FileText className="text-[#16A34A]" /> Professional Summary</h2>
                <button onClick={() => handleEnhanceWithAI('summary', resumeData.summary)} disabled={isGenerating} className="flex items-center gap-1 text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors font-medium border border-purple-200">
                  <Wand2 size={14} /> {isGenerating ? 'Enhancing...' : 'AI Enhance'}
                </button>
              </div>
              <textarea rows="4" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#16A34A] outline-none text-sm" value={resumeData.summary} onChange={e => setResumeData({...resumeData, summary: e.target.value})} placeholder="Brief overview of your professional background..."></textarea>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><BookOpen className="text-[#16A34A]" /> Education</h2>
            {resumeData.education.map((edu, i) => (
              <div key={edu.id} className="p-4 bg-gray-50 border rounded-xl relative group">
                <button onClick={() => removeArrayItem('education', i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-gray-500">Degree</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={edu.degree} onChange={e => updateArrayItem('education', i, 'degree', e.target.value)} /></div>
                  <div><label className="text-xs text-gray-500">College / University</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={edu.college} onChange={e => updateArrayItem('education', i, 'college', e.target.value)} /></div>
                  <div><label className="text-xs text-gray-500">Graduation Year</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={edu.year} onChange={e => updateArrayItem('education', i, 'year', e.target.value)} /></div>
                  <div><label className="text-xs text-gray-500">CGPA / Percentage</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={edu.cgpa} onChange={e => updateArrayItem('education', i, 'cgpa', e.target.value)} /></div>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('education', { degree: '', college: '', year: '', cgpa: '' })} className="flex items-center gap-1 text-sm text-[#16A34A] hover:text-[#22C55E] font-medium"><Plus size={16} /> Add Education</button>
            
            <div className="pt-6 border-t mt-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Code className="text-[#16A34A]" /> Skills</h2>
                <button onClick={() => handleEnhanceWithAI('skills', 'Software Engineer')} disabled={isGenerating} className="flex items-center gap-1 text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors font-medium border border-purple-200">
                  <Wand2 size={14} /> AI Suggest Skills
                </button>
              </div>
              <div className="space-y-3">
                <div><label className="text-xs text-gray-500">Technical Skills (comma separated)</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={resumeData.skills.technical} onChange={e => setResumeData({...resumeData, skills: {...resumeData.skills, technical: e.target.value}})} /></div>
                <div><label className="text-xs text-gray-500">Soft Skills (comma separated)</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={resumeData.skills.soft} onChange={e => setResumeData({...resumeData, skills: {...resumeData.skills, soft: e.target.value}})} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Briefcase className="text-[#16A34A]" /> Experience</h2>
            {resumeData.experience.map((exp, i) => (
              <div key={exp.id} className="p-4 bg-gray-50 border rounded-xl relative group">
                <button onClick={() => removeArrayItem('experience', i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><label className="text-xs text-gray-500">Company</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={exp.company} onChange={e => updateArrayItem('experience', i, 'company', e.target.value)} /></div>
                  <div><label className="text-xs text-gray-500">Role</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={exp.role} onChange={e => updateArrayItem('experience', i, 'role', e.target.value)} /></div>
                  <div className="col-span-2"><label className="text-xs text-gray-500">Duration</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={exp.duration} onChange={e => updateArrayItem('experience', i, 'duration', e.target.value)} /></div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-gray-500">Key Responsibilities</label>
                    <button onClick={() => handleEnhanceWithAI('project', exp.responsibilities, i, 'experience')} disabled={isGenerating} className="text-[10px] flex items-center gap-1 text-purple-600 hover:text-purple-800 font-bold"><Wand2 size={12}/> Enhance</button>
                  </div>
                  <textarea rows="3" className="w-full p-2 border rounded outline-none text-sm" value={exp.responsibilities} onChange={e => updateArrayItem('experience', i, 'responsibilities', e.target.value)} placeholder="What did you do?"></textarea>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('experience', { company: '', role: '', duration: '', responsibilities: '' })} className="flex items-center gap-1 text-sm text-[#16A34A] hover:text-[#22C55E] font-medium"><Plus size={16} /> Add Experience</button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Code className="text-[#16A34A]" /> Projects</h2>
            {resumeData.projects.map((proj, i) => (
              <div key={proj.id} className="p-4 bg-gray-50 border rounded-xl relative group">
                <button onClick={() => removeArrayItem('projects', i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><label className="text-xs text-gray-500">Project Title</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={proj.title} onChange={e => updateArrayItem('projects', i, 'title', e.target.value)} /></div>
                  <div><label className="text-xs text-gray-500">Link / GitHub</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={proj.link} onChange={e => updateArrayItem('projects', i, 'link', e.target.value)} /></div>
                  <div className="col-span-2"><label className="text-xs text-gray-500">Technologies Used</label><input type="text" className="w-full p-2 border rounded outline-none text-sm" value={proj.technologies} onChange={e => updateArrayItem('projects', i, 'technologies', e.target.value)} /></div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-gray-500">Description</label>
                    <button onClick={() => handleEnhanceWithAI('project', proj.description, i, 'projects')} disabled={isGenerating} className="text-[10px] flex items-center gap-1 text-purple-600 hover:text-purple-800 font-bold"><Wand2 size={12}/> Enhance</button>
                  </div>
                  <textarea rows="3" className="w-full p-2 border rounded outline-none text-sm" value={proj.description} onChange={e => updateArrayItem('projects', i, 'description', e.target.value)} placeholder="Describe the project..."></textarea>
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('projects', { title: '', description: '', technologies: '', link: '' })} className="flex items-center gap-1 text-sm text-[#16A34A] hover:text-[#22C55E] font-medium"><Plus size={16} /> Add Project</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0 print:m-0">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)] print:block print:h-auto print:w-full">
        
        {/* Left Panel: Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full print:hidden">
          {/* Progress Bar & Header */}
          <div className="bg-gray-50 border-b p-4 flex justify-between items-center">
            {isAiMode ? (
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <Wand2 className="text-purple-600" /> Advanced AI Builder
              </h2>
            ) : (
              <div className="flex gap-2">
                {[1,2,3,4].map(s => (
                  <div key={s} className={`h-2 w-16 rounded-full transition-colors ${step >= s ? 'bg-[#16A34A]' : 'bg-gray-200'}`}></div>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-3">
              {!isAiMode && <span className="text-sm font-bold text-gray-600">Step {step} of 4</span>}
              <button 
                onClick={() => setIsAiMode(!isAiMode)}
                className={`text-sm px-3 py-1.5 rounded-lg font-bold border transition-colors flex items-center gap-2 ${
                  isAiMode ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                }`}
              >
                {isAiMode ? 'Manual Entry Mode' : <><Wand2 size={14}/> AI Magic Build</>}
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 flex-grow overflow-y-auto custom-scrollbar">
            {isAiMode ? (
              <div className="space-y-6 animate-fadeIn h-full flex flex-col">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tailor Your Resume with AI</h3>
                  <p className="text-sm text-gray-500 mt-1">Paste your raw text, LinkedIn export, or the generic template. Our AI will automatically parse it, optimize it for ATS, and generate a tailored resume.</p>
                </div>
                
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Target Company / Role Type</label>
                  <select 
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50"
                  >
                    <option value="Product-Based (e.g., Google, Amazon)">Product-Based (e.g., Google, Microsoft - Focus on DSA & Impact)</option>
                    <option value="Service-Based (e.g., TCS, Infosys)">Service-Based (e.g., TCS, Infosys - Focus on fundamentals & communication)</option>
                    <option value="Startup">Startup (Focus on practical skills & multiple tech stacks)</option>
                    <option value="Fintech (e.g., Razorpay, CRED)">Fintech (Focus on backend, security, scaling)</option>
                  </select>
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="text-sm font-bold text-gray-700 block mb-2">Paste Raw Details / Experience Here</label>
                  <textarea 
                    className="w-full flex-1 p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm resize-none font-mono bg-gray-50"
                    placeholder="E.g. Name: John Doe&#10;Phone: 1234567890&#10;Skills: React, Node.js&#10;Projects: Built an E-commerce app..."
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                  ></textarea>
                </div>
              </div>
            ) : (
              renderFormStep()
            )}
          </div>

          {/* Form Navigation */}
          <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
            {isAiMode ? (
              <>
                <div></div>
                <button 
                  onClick={handleAiParse}
                  disabled={isParsing}
                  className="px-6 py-2 bg-purple-600 text-white rounded-xl flex items-center gap-2 hover:bg-purple-700 transition-colors font-bold shadow-md shadow-purple-500/20 disabled:opacity-70"
                >
                  {isParsing ? <><Loader size={18} className="animate-spin" /> Analyzing & Building...</> : <><Wand2 size={18} /> Generate Tailored Resume</>}
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setStep(step - 1)} 
                  disabled={step === 1}
                  className="px-4 py-2 border rounded-xl flex items-center gap-2 hover:bg-gray-100 disabled:opacity-50 transition-colors font-medium text-gray-700"
                >
                  <ChevronLeft size={18} /> Back
                </button>
                <button 
                  onClick={() => step < 4 ? setStep(step + 1) : handleDownloadPDF()} 
                  disabled={isDownloading}
                  className="px-6 py-2 bg-[#16A34A] text-white rounded-xl flex items-center gap-2 hover:bg-[#22C55E] transition-colors font-bold shadow-md shadow-green-500/20 disabled:opacity-70"
                >
                  {step === 4
                    ? isDownloading
                      ? <><Loader size={18} className="animate-spin" /> Generating PDF...</>
                      : <><Download size={18} /> Download PDF</>
                    : <>Next <ChevronRight size={18} /></>}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="bg-gray-300 rounded-3xl overflow-hidden flex justify-center items-start p-8 shadow-inner overflow-y-auto custom-scrollbar relative print:bg-white print:p-0 print:shadow-none print:overflow-visible">
          
          {/* A4 Paper Container */}
          <div 
            ref={resumeRef} 
            className="bg-white shadow-2xl w-full max-w-[800px] shrink-0 p-10 font-sans text-gray-800 print:shadow-none print:w-full print:max-w-none print:p-0"
            style={{ minHeight: '1056px' }} // Standard Letter/A4 aspect roughly
          >
            {/* Header with QR Code */}
            <div className="border-b-2 border-gray-800 pb-4 mb-5 flex justify-between items-center">
              <div className="flex-1 text-center pr-4">
                <h1 className="text-4xl font-extrabold uppercase tracking-wider text-gray-900">{resumeData.personal.fullName || 'YOUR NAME'}</h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600 font-medium">
                  {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                  {resumeData.personal.phone && <span>• {resumeData.personal.phone}</span>}
                  {resumeData.personal.location && <span>• {resumeData.personal.location}</span>}
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 mt-1 text-sm text-[#16A34A] font-semibold">
                  {resumeData.personal.linkedin && <a href={`https://${resumeData.personal.linkedin}`}>{resumeData.personal.linkedin}</a>}
                  {resumeData.personal.github && <span>• <a href={`https://${resumeData.personal.github}`}>{resumeData.personal.github}</a></span>}
                </div>
              </div>
              
              {/* QR Code (vCard) */}
              <div className="shrink-0 print:block">
                <QRCodeSVG 
                  value={`BEGIN:VCARD\nVERSION:3.0\nN:${resumeData.personal.fullName}\nTEL:${resumeData.personal.phone}\nEMAIL:${resumeData.personal.email}\nURL:${resumeData.personal.linkedin}\nEND:VCARD`} 
                  size={64} 
                  level="L"
                  includeMargin={false}
                />
                <p className="text-[8px] text-center mt-1 text-gray-400">Scan to Connect</p>
              </div>
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div className="mb-5">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 text-gray-800 mb-2">Professional Summary</h2>
                <p className="text-sm text-gray-700 leading-relaxed text-justify">{resumeData.summary}</p>
              </div>
            )}

            {/* Skills */}
            {(resumeData.skills.technical || resumeData.skills.soft) && (
              <div className="mb-5">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 text-gray-800 mb-2">Skills</h2>
                <div className="text-sm text-gray-700">
                  {resumeData.skills.technical && <div className="mb-1"><span className="font-bold">Technical:</span> {resumeData.skills.technical}</div>}
                  {resumeData.skills.soft && <div><span className="font-bold">Soft Skills:</span> {resumeData.skills.soft}</div>}
                </div>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && resumeData.experience[0].company && (
              <div className="mb-5">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 text-gray-800 mb-2">Experience</h2>
                <div className="space-y-4">
                  {resumeData.experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-end mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900">{exp.role}</h3>
                          <div className="text-sm font-semibold text-[#16A34A]">{exp.company}</div>
                        </div>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.duration}</span>
                      </div>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap pl-4" style={{ listStyleType: 'disc', display: 'list-item' }}>
                        {exp.responsibilities}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && resumeData.projects[0].title && (
              <div className="mb-5">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 text-gray-800 mb-2">Projects</h2>
                <div className="space-y-4">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          {proj.title} 
                          {proj.link && <span className="text-xs font-normal text-blue-600 underline">{proj.link}</span>}
                        </h3>
                      </div>
                      {proj.technologies && <div className="text-xs text-gray-600 font-mono mb-1 bg-gray-50 inline-block px-2 py-0.5 rounded border">{proj.technologies}</div>}
                      <div className="text-sm text-gray-700 whitespace-pre-wrap pl-4" style={{ listStyleType: 'disc', display: 'list-item' }}>
                        {proj.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && resumeData.education[0].degree && (
              <div className="mb-5">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 text-gray-800 mb-2">Education</h2>
                <div className="space-y-2">
                  {resumeData.education.map(edu => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                        <div className="text-sm text-gray-700">{edu.college}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-gray-500">{edu.year}</div>
                        <div className="text-sm font-semibold text-[#16A34A]">CGPA: {edu.cgpa}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeBuilder;
