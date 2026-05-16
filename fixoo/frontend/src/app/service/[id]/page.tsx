"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, Clock, ShieldCheck, CheckCircle2, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";

const SERVICES_DATA: Record<string, any> = {
  "s1": { name: "Full Home Cleaning", price: "₹1,499", rating: "4.8", reviews: 124, time: "4-5 hrs", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800", desc: "Deep cleaning of all rooms, bathrooms, and kitchen. Includes floor scrubbing and dusting." },
  "s2": { name: "AC Servicing", price: "₹499", rating: "4.9", reviews: 89, time: "1-2 hrs", image: "https://images.unsplash.com/photo-1621905252507-b35222073180?auto=format&fit=crop&q=80&w=800", desc: "Complete filter cleaning and gas check for optimum cooling performance." },
  "s3": { name: "Electrician Visit", price: "₹199", rating: "4.7", reviews: 256, time: "30 mins", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800", desc: "General electrical repairs, fan installation, or switchboard fixes." },
};

export default function ServiceDetails() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  const service = SERVICES_DATA[serviceId] || SERVICES_DATA["s1"];

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#050505] text-white pb-32">
        {/* Header Image */}
        <div className="relative h-72 w-full">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
          <button 
            onClick={() => router.back()}
            className="absolute top-6 left-6 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10"
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="px-6 -mt-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-black">{service.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded-md text-xs font-bold">
                    <Star size={12} fill="currentColor" /> {service.rating}
                  </div>
                  <span className="text-zinc-500 text-xs">{service.reviews} reviews</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-red-500">{service.price}</p>
                <p className="text-[10px] text-zinc-500 line-through">₹2,499</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-4 border-y border-white/5 my-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Clock size={14} className="text-red-500" /> {service.time}
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck size={14} className="text-red-500" /> Verified Pro
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {service.desc}
            </p>

            <div className="space-y-3">
              <h3 className="text-sm font-bold">What's Included?</h3>
              {["Professional tools & equipment", "Standard service charges", "Verified background check", "30-day service warranty"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-zinc-500">
                  <CheckCircle2 size={14} className="text-green-500" /> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sticky Bottom Booking */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent backdrop-blur-lg border-t border-white/5">
          <div className="max-w-md mx-auto flex gap-4">
            <button className="flex-1 bg-zinc-900 border border-zinc-800 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              <PhoneCall size={18} /> Help
            </button>
            <button 
              onClick={() => router.push(`/booking/${serviceId}`)}
              className="flex-[2] btn-luxury py-4 rounded-2xl font-bold text-center"
            >
              Book Now
            </button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
