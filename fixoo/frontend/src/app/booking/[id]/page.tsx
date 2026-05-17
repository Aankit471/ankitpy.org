"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { createBooking } from "@/lib/dbUtils";
import { useToast } from "@/context/ToastContext";
import { Booking } from "@/types";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("Today, 29 Apr");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "COD">("UPI");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleComplete = async () => {
    if (!user) {
      showToast("Please login to book a service", "error");
      return;
    }
    
    setLoading(true);
    try {
      const bookingData: Booking = {
        user_id: user.uid,
        service_type: "AC Repair", // Defaulting for demo based on params.id
        scheduled_date: `${selectedDate} ${selectedTime}`,
        address: "Sector 62, Noida, Uttar Pradesh, 201309",
        price: 1548,
        payment_method: paymentMethod,
        status: "pending",
        payment_status: "pending",
        user_name: user.displayName || "Ankit Sharma",
        user_phone: user.phoneNumber || "+91 9876543210"
      };

      await createBooking(bookingData);
      showToast("Booking Confirmed! A pro will be assigned shortly.", "success");
      router.push("/bookings"); // redirect to bookings
    } catch (error) {
      console.error("Booking error:", error);
      showToast("Failed to create booking. Using mock success.", "warning");
      setTimeout(() => router.push("/home"), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#050505] text-white p-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-white/5">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Schedule Service</h1>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? "bg-red-600" : "bg-zinc-800"}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar size={20} className="text-red-500" /> Select Date</h2>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {["Today, 29 Apr", "Tomorrow, 30 Apr", "Thu, 1 May", "Fri, 2 May"].map((date) => (
                    <button 
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 px-6 py-4 rounded-2xl border transition-all ${selectedDate === date ? "bg-red-600 border-red-600 font-bold" : "bg-zinc-900 border-white/5"}`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock size={20} className="text-red-500" /> Select Time</h2>
                <div className="grid grid-cols-3 gap-3">
                  {["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "04:00 PM"].map((time) => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl border text-sm transition-all ${selectedTime === time ? "bg-red-600 border-red-600 font-bold" : "bg-zinc-900 border-white/5"}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold flex items-center gap-2"><MapPin size={20} className="text-red-500" /> Service Address</h2>
              <div className="glass-card p-6 rounded-2xl border-red-600/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Home</span>
                  <button className="text-red-500 text-xs font-bold">Edit</button>
                </div>
                <p className="text-sm font-bold">Ankit Sharma</p>
                <p className="text-sm text-zinc-400 mt-1">Sector 62, Noida, Uttar Pradesh, 201309</p>
                <p className="text-sm text-zinc-400">+91 9876543210</p>
              </div>
              <button className="w-full py-4 rounded-2xl border border-dashed border-zinc-800 text-zinc-500 font-bold text-sm">
                + Add New Address
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold flex items-center gap-2"><CreditCard size={20} className="text-red-500" /> Payment Summary</h2>
              <div className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Service Total</span>
                  <span className="font-bold">₹1,499</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Taxes & Fee</span>
                  <span className="font-bold">₹49</span>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between">
                  <span className="font-black text-lg">Total Amount</span>
                  <span className="font-black text-lg text-red-500">₹1,548</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold">Choose Payment Method</h3>
                <button 
                  onClick={() => setPaymentMethod("UPI")}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${paymentMethod === "UPI" ? "bg-zinc-900 border-red-500" : "bg-zinc-900/50 border-white/5"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-[10px]">UPI</div>
                    <span className="text-sm font-bold">Google Pay / PhonePe</span>
                  </div>
                  <ChevronRight size={16} className={paymentMethod === "UPI" ? "text-red-500" : "text-zinc-500"} />
                </button>
                <button 
                  onClick={() => setPaymentMethod("COD")}
                  className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${paymentMethod === "COD" ? "bg-zinc-900 border-red-500" : "bg-zinc-900/50 border-white/5"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center"><CreditCard size={14} /></div>
                    <span className="text-sm font-bold">Cash After Service</span>
                  </div>
                  <ChevronRight size={16} className={paymentMethod === "COD" ? "text-red-500" : "text-zinc-500"} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 p-6">
          <button 
            disabled={loading}
            onClick={() => step < 3 ? setStep(step + 1) : handleComplete()}
            className="w-full btn-luxury py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{step === 3 ? "Confirm Booking" : "Continue"} <ChevronRight size={18} /></>}
          </button>
        </div>
      </main>
    </ProtectedRoute>
  );
}
