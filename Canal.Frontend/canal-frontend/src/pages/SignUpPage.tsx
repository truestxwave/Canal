import React, { useState } from "react";
import { AUTH_API } from "../api/ApiConfig";


const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${AUTH_API}/api/auth/register`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const message = await response.text();
      console.log("Response message:", message); // Log the response message for debugging

      if (!response.ok) {
        throw new Error("Sign up failed");
      }
      console.log("Sign up successful:", message); // Log success message for debugging
      alert("Sign up successful! Please log in with your new credentials.");
        // Optionally, you can redirect to the login page after successful sign up
        window.location.href = "/login"
      

      // Handle successful sign up (e.g., redirect to login page)
    } catch (error) {
      console.error("Sign up failed:", error);
      alert("Sign up failed:, " + "An error has occurred during sign up. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="card-title text-center mb-4">Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
