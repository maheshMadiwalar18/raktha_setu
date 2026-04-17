import React, { useState } from 'react';
import { Heart, Mail, Lock, ArrowRight, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Simple Logo for Login
const RakhtSetuLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 2C16 2 6 12 6 19C6 24.5228 10.4772 29 16 29C21.5228 29 26 24.5228 26 19C26 12 16 2 16 2Z" fill="#dc2626" />
    <path d="M8.5 22C10.5 19.5 13 18 16 18C19 18 21.5 19.5 23.5 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Determine where to go based on email for demo purposes
      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
      e.preventDefault();
      setError('');
      setSuccessMsg('');

      if (!email) {
        setError('Please enter your email address to reset password.');
        return;
      }
      
      try {
        setSuccessMsg('Sending reset link...');
        await forgotPassword(email);
        setSuccessMsg(`Password reset link has been sent to ${email}. Please check your inbox.`);
      } catch (err) {
        setError('Failed to send reset link. Please try again.');
        setSuccessMsg('');
      }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fadeIn">
       {/* Background decorations */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-30"></div>
       </div>

       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative z-10">
          <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6 group">
                  <RakhtSetuLogo className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="mt-2 text-slate-500">Sign in to continue your lifesaving journey.</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
             <div className="space-y-4">
                <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1 block">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                            type="email" 
                            required 
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all sm:text-sm" 
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-semibold text-slate-700">Password</label>
                        <button onClick={handleForgotPassword} type="button" className="text-sm font-medium text-brand-600 hover:text-brand-500">Forgot password?</button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                            type="password" 
                            required 
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all sm:text-sm" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
             </div>

             {error && (
                 <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg animate-shake">
                     <AlertCircle className="w-4 h-4" />
                     {error}
                 </div>
             )}

             {successMsg && (
                 <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg animate-fadeIn">
                     <CheckCircle className="w-4 h-4" />
                     {successMsg}
                 </div>
             )}

             <button 
                type="submit" 
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
             >
                {isLoading ? 'Signing in...' : 'Sign in'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
             </button>
          </form>
          
          <div className="mt-8">
              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">New to RakhtSetu?</span>
                  </div>
              </div>
              
              <div className="mt-6 text-center">
                  <button 
                    onClick={() => navigate('/register')} 
                    className="w-full flex items-center justify-center px-4 py-3 border-2 border-slate-100 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-200 transition-all"
                  >
                      Create an account
                  </button>
              </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
                For demo, use <span className="font-mono text-slate-600">admin@rakhtsetu.com</span> / <span className="font-mono text-slate-600">admin</span>
            </p>
          </div>
       </div>
    </div>
  );
};
export default Login;