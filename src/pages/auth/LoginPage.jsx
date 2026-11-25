import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAcademicData } from '../../context/AcademicDataContext';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  School,
  AlertCircle,
  UserPlus,
  LogIn,
  User
} from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, registerStudent } = useAuth();
  const { settings } = useAcademicData();

  // Mode: 'signin' or 'register'
  const [authMode, setAuthMode] = useState('signin');

  // Sign In state
  const [email, setEmail] = useState('admin@edutrack.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedDemoRole, setSelectedDemoRole] = useState('admin');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Registration state for new student runtime creation
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRollNumber, setRegRollNumber] = useState('');
  const [regDepartment, setRegDepartment] = useState('Computer Science & Engineering');
  const [regShowPassword, setRegShowPassword] = useState(false);

  // Demo accounts
  const demoAccounts = [
    {
      role: 'admin',
      label: 'Administrator',
      email: 'admin@edutrack.edu',
      description: 'Dean / Registrar access'
    },
    {
      role: 'faculty',
      label: 'Faculty / Teacher',
      email: 'faculty@edutrack.edu',
      description: 'Class teacher & marks evaluator'
    },
    {
      role: 'student',
      label: 'Student',
      email: 'student@edutrack.edu',
      description: 'Rohan Sharma (22CSE042)'
    },
    {
      role: 'parent',
      label: 'Parent',
      email: 'parent@edutrack.edu',
      description: 'Mr. Ramesh Sharma (Ward)'
    }
  ];

  const handleSelectRole = (roleItem) => {
    setSelectedDemoRole(roleItem.role);
    setEmail(roleItem.email);
    setPassword('demopass123');
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email or Roll Number');
      return;
    }
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const result = login(email, password, selectedDemoRole);
      setIsLoading(false);
      if (result.success) {
        navigate(`/${result.user.role}/dashboard`);
      } else {
        setError(result.error || 'Invalid credentials. Please select a demo role or register a new student account.');
      }
    }, 350);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation 1: Email must contain '@'
    if (!regEmail || !regEmail.includes('@')) {
      setError('Please provide a valid email address containing "@" (e.g. student@gmail.com)');
      return;
    }

    // Validation 2: Password minimum 4 characters
    if (!regPassword || regPassword.trim().length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    if (!regName.trim()) {
      setError('Please enter your full name');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = registerStudent({
        name: regName,
        email: regEmail,
        password: regPassword,
        rollNumber: regRollNumber || `22CSE0${Math.floor(Math.random() * 89) + 10}`,
        department: regDepartment
      });

      setIsLoading(false);

      if (res.success) {
        navigate('/student/dashboard');
      } else {
        setError(res.error || 'Could not register student. Please check details.');
      }
    }, 400);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setForgotModalOpen(false);
    }, 2000);
  };

  // Real-time validation status helpers
  const isEmailValid = regEmail.includes('@') && regEmail.length >= 3;
  const isPasswordValid = regPassword.trim().length >= 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background glow spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner / Academic Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-xl shadow-brand-500/30 text-white mb-4 animate-slide-up">
          <GraduationCap className="w-9 h-9" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Edu<span className="text-brand-400">Track</span>
        </h1>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-300">
          Academic Performance & Report System
        </p>
        <p className="mt-2 text-xs text-slate-400">
          {settings?.institution?.name || 'Apex Institute of Science & Technology'}
        </p>
      </div>

      {/* Main Login / Register Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-200/80 dark:border-slate-800 animate-slide-up">
          
          {/* Auth Mode Toggle Tabs (Sign In vs Create Student Account) */}
          <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 mb-6">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                authMode === 'signin'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                authMode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Student Account</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ===================== MODE 1: SIGN IN ===================== */}
          {authMode === 'signin' && (
            <div>
              <div className="mb-5 text-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Institutional Single Sign-On
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select your university role or enter student credentials
                </p>
              </div>

              {/* Quick Demo Role Selector Pills */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Select Demo Role (1-Click Login):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map((item) => (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => handleSelectRole(item)}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all duration-150 ${
                        selectedDemoRole === item.role
                          ? 'border-brand-600 bg-brand-50/90 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/30 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{item.label}</span>
                        {selectedDemoRole === item.role && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                        )}
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-0.5 truncate">
                        {item.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email / Roll Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setSelectedDemoRole(null); }}
                      placeholder="e.g. admin@edutrack.edu or custom@email.com"
                      className="block w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password (min 4 characters)
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter security password"
                      className="block w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 mr-2"
                    />
                    Remember this device
                  </label>
                  <span className="text-[11px] text-slate-400">Session: 30 Days</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  className="w-full mt-2 py-3 text-sm font-bold shadow-lg shadow-brand-500/25"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Sign In to EduTrack
                </Button>
              </form>

              {/* Switch to Register link */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setError(''); }}
                  className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                >
                  New student? Click here to Create Student Account
                </button>
              </div>
            </div>
          )}

          {/* ===================== MODE 2: CREATE STUDENT ACCOUNT ===================== */}
          {authMode === 'register' && (
            <div className="animate-fade-in">
              <div className="mb-5 text-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Create Student Account
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Register a new student in real-time with verified credentials
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Aniket Patel"
                      className="block w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                {/* Email with @ validation */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email Address (Must contain @) *
                    </label>
                    {regEmail && (
                      <span className={`text-[10px] font-bold ${isEmailValid ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isEmailValid ? '✓ Valid @ email' : '✗ Missing @'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. aniket@gmail.com or aniket@edutrack.edu"
                      className={`block w-full pl-10 pr-4 py-2 text-xs rounded-xl border ${
                        regEmail && !isEmailValid
                          ? 'border-rose-400 focus:ring-rose-400'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-brand-500'
                      } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Must be a valid email containing <strong className="text-brand-500">@</strong> (e.g., student@domain.com)
                  </p>
                </div>

                {/* Password with min 4 char validation */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password (Minimum 4 characters) *
                    </label>
                    {regPassword && (
                      <span className={`text-[10px] font-bold ${isPasswordValid ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isPasswordValid ? `✓ ${regPassword.length} chars (OK)` : `${regPassword.length}/4 chars`}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={regShowPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Enter minimum 4 characters"
                      className={`block w-full pl-10 pr-10 py-2 text-xs rounded-xl border ${
                        regPassword && !isPasswordValid
                          ? 'border-rose-400 focus:ring-rose-400'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-brand-500'
                      } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2`}
                    />
                    <button
                      type="button"
                      onClick={() => setRegShowPassword(!regShowPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {regShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Password must be at least <strong className="text-brand-500">4 characters</strong> long
                  </p>
                </div>

                {/* Roll Number (optional/auto) */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Roll Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={regRollNumber}
                      onChange={(e) => setRegRollNumber(e.target.value)}
                      placeholder="e.g. 22CSE052"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={regDepartment}
                      onChange={(e) => setRegDepartment(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Computer Science & Engineering">Computer Science</option>
                      <option value="Electronics & Communication">Electronics</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  className="w-full mt-3 py-3 text-xs font-bold shadow-lg shadow-brand-500/25"
                  icon={UserPlus}
                  iconPosition="right"
                >
                  Create Student Account & Enter
                </Button>
              </form>

              {/* Switch back to signin */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setError(''); }}
                  className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                >
                  Already have an account? Sign In
                </button>
              </div>
            </div>
          )}

          {/* Institutional Trust Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 text-center">
            <div className="flex items-center justify-center space-x-1.5 text-slate-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>256-bit Institutional SSL Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset Academic Account Password"
        subtitle="Enter your verified university email to receive a recovery link"
      >
        {resetSuccess ? (
          <div className="p-4 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Password Reset Link Sent!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A temporary password token has been sent to {resetEmail || 'your email'}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Institutional Email ID
              </label>
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="e.g. student@edutrack.edu"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setForgotModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default LoginPage;
