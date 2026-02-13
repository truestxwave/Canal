import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage"

const AppRouter: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
  <Route path="/" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
    <Route path="/signup" element={<SignUp />} />
  <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
  <Route path="/error" element={<ErrorPage />} />
  <Route path="*" element={<Navigate to="/" />} /> {/* must be last */}
</Routes>

  );
};

export default AppRouter;
