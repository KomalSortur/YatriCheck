import { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/login_bg.png';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [usePhone, setUsePhone] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin) {
      // Registration Flow
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert('Signup successful! Please login.');
          setIsLogin(true); // Switch to login view
          setPassword(''); // Clear password field
        } else {
          setError(data.message || 'Registration failed');
        }
      } catch (err) {
        setError('Server connection error');
      } finally {
        setLoading(false);
      }
    } else {
      // Login Flow
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          navigate('/home');
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        setError('Server connection error');
      } finally {
        setLoading(false);
      }
    }
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

          {error && <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200">{error}</div>}

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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <button type="submit" className="login-btn-primary" disabled={loading}>
                {loading ? 'Processing...' : (isLogin ? 'Log in' : 'Create Account')}
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
