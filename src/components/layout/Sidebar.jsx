import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  BarChart3,
  Bell,
  Settings,
  CalendarCheck,
  Award,
  MessageSquare,
  UserCheck,
  FolderOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  HeartHandshake
} from 'lucide-react';

export const Sidebar = ({ isCollapsed, setIsCollapsed, mobileOpen, setMobileOpen }) => {
  const { role, currentUser, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Define role-specific navigation menus
  const navConfigs = {
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Students', path: '/admin/students', icon: Users, badge: '42' },
      { name: 'Faculty', path: '/admin/faculty', icon: GraduationCap },
      { name: 'Subjects & Classes', path: '/admin/classes', icon: BookOpen },
      { name: 'Academic Reports', path: '/admin/reports', icon: FileText },
      { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
      { name: 'Announcements', path: '/admin/announcements', icon: Bell },
      { name: 'Settings', path: '/admin/settings', icon: Settings }
    ],
    faculty: [
      { name: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
      { name: 'My Students', path: '/faculty/students', icon: Users },
      { name: 'Attendance', path: '/faculty/attendance', icon: CalendarCheck, badge: 'Daily' },
      { name: 'Marks Management', path: '/faculty/marks', icon: Award },
      { name: 'Student Remarks', path: '/faculty/remarks', icon: MessageSquare },
      { name: 'Reports', path: '/faculty/reports', icon: FileText },
      { name: 'Announcements', path: '/faculty/announcements', icon: Bell },
      { name: 'My Profile', path: '/faculty/profile', icon: UserCheck }
    ],
    student: [
      { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
      { name: 'My Attendance', path: '/student/attendance', icon: CalendarCheck },
      { name: 'My Results', path: '/student/results', icon: Award },
      { name: 'My Subjects', path: '/student/subjects', icon: BookOpen },
      { name: 'Academic Progress', path: '/student/progress', icon: BarChart3 },
      { name: 'Report Cards', path: '/student/reports', icon: FileText, highlight: true },
      { name: 'Announcements', path: '/student/announcements', icon: Bell },
      { name: 'My Profile', path: '/student/profile', icon: UserCheck }
    ],
    parent: [
      { name: 'Child Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
      { name: 'Attendance Record', path: '/parent/attendance', icon: CalendarCheck },
      { name: 'Results & Marks', path: '/parent/results', icon: Award },
      { name: 'Progress Report', path: '/parent/reports', icon: FileText, highlight: true },
      { name: 'Faculty Remarks', path: '/parent/remarks', icon: MessageSquare },
      { name: 'Announcements', path: '/parent/announcements', icon: Bell }
    ]
  };

  const navItems = navConfigs[role] || navConfigs.admin;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
          <div
            className="flex items-center space-x-3 cursor-pointer overflow-hidden"
            onClick={() => navigate(`/${role}/dashboard`)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight flex items-center">
                  Edu<span className="text-brand-600 dark:text-brand-400">Track</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                  Academic SaaS
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Role Badge Indicator */}
        {!isCollapsed && (
          <div className="px-4 py-2.5 mx-3 my-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {role} portal
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold">
              v2.4
            </span>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-3 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                title={isCollapsed ? item.name : undefined}
                className={({ isActive: isLinkActive }) =>
                  `group flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isLinkActive || isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60'
                  } ${isCollapsed ? 'justify-center' : 'justify-between'}`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200'
                    }`}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer: User Snapshot & Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <div
            className={`flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-between'
            } p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40`}
          >
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover border border-white dark:border-slate-700 shrink-0"
              />
              {!isCollapsed && (
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {currentUser?.name || 'User'}
                  </p>
                  <p className="text-[11px] text-slate-400 capitalize truncate">
                    {role}
                  </p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
