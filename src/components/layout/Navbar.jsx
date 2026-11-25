import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useAcademicData } from '../../context/AcademicDataContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  User,
  LogOut,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  X
} from 'lucide-react';

export const Navbar = ({ onMenuClick, isCollapsed }) => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { announcements, students, subjects, settings } = useAcademicData();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  // Search filtering
  const filteredStudents = searchQuery.trim()
    ? students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredSubjects = searchQuery.trim()
    ? subjects.filter(sub =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.code.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
      if (!e.target.closest('.notification-container')) {
        setShowNotifications(false);
      }
      if (!e.target.closest('.profile-container')) {
        setShowProfileMenu(false);
      }
      if (!e.target.closest('.role-container')) {
        setShowRoleSelector(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleRoleChange = (newRole) => {
    switchRole(newRole);
    setShowRoleSelector(false);
    navigate(`/${newRole}/dashboard`);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Mobile hamburger & Institutional Name / Breadcrumb */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 lg:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              {settings?.institution?.name || 'Apex Institute of Science & Technology'}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              Academic Session {settings?.institution?.currentAcademicYear || '2024-2025'} • Fall Sem
            </span>
          </div>
        </div>

        {/* Center: Global Search Bar with Autocomplete Modal */}
        <div className="relative search-container flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search students, roll no, subjects, reports..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search Dropdown Modal */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-slide-up">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Students
              </div>
              {filteredStudents.length > 0 ? (
                <div className="space-y-1 mb-2">
                  {filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery('');
                        navigate(`/admin/students`);
                      }}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                            {s.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {s.rollNumber} • {s.department}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold font-mono text-brand-600 dark:text-brand-400">
                        {s.cgpa} CGPA
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 px-2 py-1">No students match "{searchQuery}"</p>
              )}

              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 border-t border-slate-100 dark:border-slate-800 pt-2">
                Courses & Subjects
              </div>
              {filteredSubjects.length > 0 ? (
                <div className="space-y-1">
                  {filteredSubjects.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery('');
                        navigate(`/${role}/dashboard`);
                      }}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-brand-500" />
                        <div>
                          <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                            {sub.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {sub.code} • {sub.credits} Credits
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{sub.facultyName}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 px-2 py-1">No courses found</p>
              )}
            </div>
          )}
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Role Switcher Pill (Crucial for Reviewers/Hackathon) */}
          <div className="relative role-container">
            <button
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-bold capitalize">Role: {role}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-slide-up">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch Demo Role
                </div>
                {[
                  { id: 'admin', label: 'Administrator', desc: 'Full institutional control' },
                  { id: 'faculty', label: 'Faculty / Teacher', desc: 'Attendance & Marks' },
                  { id: 'student', label: 'Student', desc: 'Results & Attendance' },
                  { id: 'parent', label: 'Parent', desc: 'Ward Monitoring' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleRoleChange(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col transition-colors ${
                      role === item.id
                        ? 'bg-brand-500 text-white font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-[10px] ${role === item.id ? 'text-brand-100' : 'text-slate-400'}`}>
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative notification-container">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-slide-up">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Campus Announcements & Alerts
                  </h4>
                  <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-full">
                    {announcements.length} New
                  </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-72 overflow-y-auto">
                  {announcements.slice(0, 4).map((ann) => (
                    <div key={ann.id} className="py-2.5 first:pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {ann.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{ann.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {ann.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate(`/${role}/announcements`);
                    }}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    View All Institutional Announcements →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative profile-container">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-slide-up">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {currentUser?.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {currentUser?.email}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-full">
                    {role} account
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate(`/${role}/dashboard`);
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Dashboard</span>
                  </button>
                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/admin/settings');
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <ShieldAlert className="w-4 h-4 text-slate-400" />
                      <span>System Settings</span>
                    </button>
                  )}
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
