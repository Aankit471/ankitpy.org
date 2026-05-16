"use client";

import { motion } from "framer-motion";
import { User, MapPin, CreditCard, Bell, Settings, LogOut, ChevronRight, Star, ShieldCheck } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  const router = useRouter();

  const menuItems = [
    { icon: User, label: "Edit Profile", color: "text-blue-400" },
    { icon: MapPin, label: "Saved Addresses", color: "text-red-400" },
    { icon: CreditCard, label: "Payments & Refunds", color: "text-green-400" },
    { icon: Bell, label: "Notifications", color: "text-yellow-400" },
    { icon: ShieldCheck, label: "Safety & Privacy", color: "text-purple-400" },
    { icon: Settings, label: "App Settings", color: "text-gray-400" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("fixoo_mock_user");
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white pb-24">
        {/* Profile Header */}
        <div className="bg-gradient-to-b from-red-900/20 to-black p-8 pt-16">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-red-600 p-1">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Profile" 
                  className="w-full h-full rounded-full bg-zinc-800"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-red-600 p-1.5 rounded-full border-2 border-black">
                <Settings size={14} />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-black italic">ANKIT RAJ</h2>
            <p className="text-gray-500 text-sm">ankit@example.com | +91 98765 43210</p>
            
            <div className="flex gap-4 mt-6 w-full max-w-xs">
              <div className="flex-1 glass-card p-3 rounded-2xl text-center border-red-900/30">
                 <div className="text-red-500 font-black text-lg">12</div>
                 <div className="text-[10px] text-gray-500 uppercase tracking-wider">Bookings</div>
              </div>
              <div className="flex-1 glass-card p-3 rounded-2xl text-center border-red-900/30">
                 <div className="text-red-500 font-black text-lg">4.9</div>
                 <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu List */}
        <div className="px-6 space-y-3 mt-4">
          {menuItems.map((item, idx) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="w-full glass-card p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl bg-zinc-900 group-hover:scale-110 transition-transform`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <span className="font-semibold text-gray-200">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-600" />
            </motion.button>
          ))}

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleLogout}
            className="w-full p-4 rounded-2xl flex items-center gap-4 text-red-500 font-bold mt-4 hover:bg-red-500/10 transition-colors"
          >
            <div className="p-2 rounded-xl bg-red-500/10">
              <LogOut size={20} />
            </div>
            <span>Logout</span>
          </motion.button>
        </div>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
