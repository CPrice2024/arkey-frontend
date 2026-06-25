import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo6.png'
import api from "../api";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  LogIn
} from "lucide-react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post(
  "/auth/login",
  {
    email,
    password
  }
);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      if (res.data.user.role === "player") {
  navigate("/game");
} else {
  navigate("/");
}
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="logo-icon">
  <img src={logo} alt="Company Logo" />
</div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={submit}>
          {/* Error Message */}
          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label>
              Email Address
              <span className="required-star">*</span>
            </label>
            <div className="input-box">
              <Mail size={18} />
              <input
                type="email"
                placeholder="name@arkey.bet"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>
              Password
              <span className="required-star">*</span>
            </label>
            <div className="input-box">
              <Lock size={18} />
              <input
              className="input-box"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>

          {/* Divider */}
          <div className="divider">
            <span>New here?</span>
          </div>

          {/* Sign Up Link */}
          <div className="signup-link">
            Don't have an account? <a href="/register">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;