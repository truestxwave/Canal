import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-red-100 p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-red-800 mb-4">Oops!</h1>
        <p className="mb-6 text-red-700">Something went wrong with the backend.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
