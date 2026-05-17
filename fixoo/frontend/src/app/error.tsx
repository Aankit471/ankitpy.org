"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
      >
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h2>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          We encountered an unexpected error while loading this page. 
          Our technical team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-[#1e0a2d] text-white py-4 px-4 rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
