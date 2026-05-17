"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Camera, ArrowRight } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { saveUserProfile } from "@/lib/dbUtils";

import { useToast } from "@/context/ToastContext";

export default function SetupProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    city: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast("You must be logged in.", "error");
      return;
    }
    
    setLoading(true);
    try {
      await saveUserProfile(user.uid, {
        ...formData,
        phoneNumber: user.phoneNumber || ""
      });
      showToast("Profile saved successfully!", "success");
      router.push("/home");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      showToast(error.message || "Failed to save profile. Bypassing for now.", "error");
      // Bypass the block so the user can see the app even if Firestore isn't setup
      setTimeout(() => {
         router.push("/home");
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white flex flex-col p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto w-full pt-12"
        >
          <h1 className="text-3xl font-black mb-2">Complete Profile</h1>
          <p className="text-gray-500 mb-10">Tell us a bit about yourself to get started.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 bg-zinc-900 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center overflow-hidden group-hover:border-red-500 transition-colors">
                  <Camera size={32} className="text-zinc-500 group-hover:text-red-500" />
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-2 border-black">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <input 
                  required
                  type="text" 
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="input-luxury pl-14"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <input 
                  required
                  type="email" 
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-luxury pl-14"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <select 
                  required
                  className="input-luxury pl-14 appearance-none"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                >
                  <option value="">Select your city</option>
                  <option value="delhi">Delhi / NCR</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="pune">Pune</option>
                  <option value="hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="btn-luxury w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-8"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Save & Continue <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
