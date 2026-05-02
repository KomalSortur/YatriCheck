import React, { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/login_bg.png';

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
    <div className="login-page">
      {/* Left Side: Desert Image & Text */}
      <div className="login-left">
        <img src={loginBg} alt="Desert Landscape" className="login-bg-image" />
        <div className="login-left-overlay">
          <h1 className="login-left-title">Welcome to Yatra-Check</h1>
          <p className="login-left-subtitle">Where your plans meet destinations</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="login-right">
        <div className="login-content">
          <div className="login-form-header">
            <span className="login-label-top">Login your account</span>
            <h2 className="login-title-main">
              {isLogin ? 'Welcome Back!' : 'Welcome'}
            </h2>
            <p className="login-subtitle-main">
              {isLogin ? 'Enter your email and password' : 'Create an account to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="login-field">
                <label className="login-field-label">Full Name</label>
                <div className="login-input-wrapper">
                  <User size={18} className="login-input-icon" />
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="login-input"
                    required
                  />
                </div>
              </div>
            )}

            <div className="login-field">
              <label className="login-field-label">
                {usePhone ? 'Phone Number' : 'Email address'}
              </label>
              <div className="login-input-wrapper">
                {usePhone ? (
                  <Phone size={18} className="login-input-icon" />
                ) : (
                  <Mail size={18} className="login-input-icon" />
                )}
                <input 
                  type={usePhone ? "tel" : "email"} 
                  placeholder={usePhone ? "Enter your phone" : "Hello@basitkhan.design"}
                  className="login-input"
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-field-label">Password</label>
              <div className="login-input-wrapper">
                <Lock size={18} className="login-input-icon" />
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="login-input"
                  required
                />
              </div>
              {isLogin && (
                <button type="button" className="login-forgot">
                  Forgot Password?
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <button type="submit" className="login-btn-primary">
                {isLogin ? 'Log in' : 'Create Account'}
              </button>
              
              <button 
                type="button"
                onClick={() => setUsePhone(!usePhone)}
                className="login-secondary-link"
              >
                Use {usePhone ? 'Email' : 'Phone'} instead
              </button>
            </div>
          </form>

          <div className="login-footer-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="login-toggle-btn"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
