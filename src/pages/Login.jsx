import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Phone, Globe, Smartphone, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [usePhone, setUsePhone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login success
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="glass-card w-full max-w-md p-8 relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-2 outfit text-gradient">
            {isLogin ? 'Welcome Back' : 'Join YatriCheck'}
          </h2>
          <p className="text-text-muted text-sm">
            {isLogin ? 'Sign in to continue your journey' : 'Create an account to start planning trips'}
          </p>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="glass py-3 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-white/5 transition-all">
            <Globe size={18} className="text-primary" />
            Google
          </button>
          <button className="glass py-3 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-white/5 transition-all">
            <Smartphone size={18} />
            Phone
          </button>
        </div>

        <div className="relative mb-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-glass-border"></div></div>
          <span className="relative px-4 bg-background text-xs text-text-muted uppercase font-bold tracking-widest">Or continue with</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full bg-white/5 border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-all text-sm"
                required
              />
            </div>
          )}

          <div className="relative">
            {usePhone ? (
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            ) : (
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            )}
            <input 
              type={usePhone ? "tel" : "email"} 
              placeholder={usePhone ? "Phone Number" : "Email Address"}
              className="w-full bg-white/5 border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-all text-sm"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-white/5 border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-all text-sm"
              required
            />
          </div>

          {isLogin && (
            <div className="flex items-center justify-between px-1">
              <button 
                type="button"
                onClick={() => setUsePhone(!usePhone)}
                className="text-xs text-primary font-bold hover:underline"
              >
                Use {usePhone ? 'Email' : 'Phone'} instead
              </button>
              <button type="button" className="text-xs text-text-muted hover:text-white transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all mt-6 group shadow-lg shadow-primary/25"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-glass-border pt-6">
          <p className="text-sm text-text-muted">
            {isLogin ? "New to YatriCheck?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-white font-bold hover:text-primary transition-colors"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
