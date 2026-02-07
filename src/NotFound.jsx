import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black text-white px-6">
      
      <Dumbbell className="h-16 w-16 text-emerald-500 mb-6" />

      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};
