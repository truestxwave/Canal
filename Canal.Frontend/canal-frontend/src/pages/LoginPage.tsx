import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


interface LoginPageProps {
  onLogin: () => void; // this will be called after successful login
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in", email, password);

    // Mark as logged in
    onLogin();

    // Navigate to dashboard
    navigate("/dashboard");
  };

    const goToSignUp = () => {
      navigate("/signup");
    
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark px-3">
      <div className="card p-5 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="h3 mb-2 text-white">Canal</h1>
          <p className="text-muted mb-0">Sign in to your workspace</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign In</button>

          {/* Sign Up Link */}

          <button
          type="button"
          className="btn btn-primary-light w-100" onClick={goToSignUp}>
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-muted mt-4 mb-0 small">
          Jira-style ticketing · Built with Canal
        </p>
      </div>
    </div>
  );
};



export default LoginPage;