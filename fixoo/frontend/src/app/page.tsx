"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Phone, Globe, Laptop } from "lucide-react";
import { auth, isMockMode } from "@/lib/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  // Initialize Recaptcha
  useEffect(() => {
    if (typeof window !== "undefined" && !isMockMode && auth.app) {
      try {
        if (!(window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': () => {
              console.log("Recaptcha verified");
            }
          });
        }
      } catch (e) {
        console.error("Recaptcha init failed:", e);
      }
    }
    
    return () => {
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    };
  }, []);

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      showToast("Please enter a valid 10-digit number", "error");
      return;
    }
    setLoading(true);
    
    // Mock flow
    if (isMockMode || phone === "0000000000") {
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
        showToast("Mock OTP Sent: 123456", "info");
      }, 1000);
      return;
    }

    try {
      const appVerifier = (window as any).recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("Recaptcha not initialized. Please refresh.");
      }
      const formatPhone = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(auth, formatPhone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      showToast("OTP sent to your phone", "success");
    } catch (error: any) {
      console.error("OTP Error:", error);
      // Fallback to mock mode automatically on ANY error to prevent demo blocks
      showToast(`Firebase OTP failed (${error.code || 'config_error'}). Falling back to Demo Mode.`, "error");
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
        showToast("Demo OTP Sent: 123456", "info");
      }, 1500);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    const code = otp.join("");
    if (code.length !== 6) {
      showToast("Please enter all 6 digits", "error");
      setLoading(false);
      return;
    }
    
    // Mock flow or Fallback flow
    if (isMockMode || phone === "0000000000" || !confirmationResult) {
      if (code === "123456" || !confirmationResult) {
        setTimeout(() => {
          localStorage.setItem("fixoo_mock_user", JSON.stringify({ phoneNumber: phone, uid: "mock-123" }));
          showToast("Logged in successfully (Demo)", "success");
          router.push("/setup-profile");
          setLoading(false);
        }, 1000);
      } else {
        showToast("Invalid Mock OTP. Please use 123456", "error");
        setLoading(false);
      }
      return;
    }

    try {
      await confirmationResult.confirm(code);
      showToast("Authentication successful!", "success");
      router.push("/setup-profile");
    } catch (error: any) {
      console.error("Verify Error:", error);
      showToast("Invalid OTP code. Please try again.", "error");
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: 'google' | 'facebook') => {
    try {
      setLoading(true);
      if (isMockMode) {
        localStorage.setItem("fixoo_mock_user", JSON.stringify({ displayName: "Mock User", uid: "mock-123" }));
        showToast("Social login successful (Mock)", "success");
        router.push("/setup-profile");
        return;
      }
      const provider = providerName === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      showToast(`Signed in with ${providerName}`, "success");
      router.push("/setup-profile");
    } catch (error: any) {
      console.error("Social Login Error:", error);
      showToast(`${providerName} Auth failed. Falling back to Demo Mode.`, "error");
      setTimeout(() => {
        localStorage.setItem("fixoo_mock_user", JSON.stringify({ displayName: "Demo User", uid: "mock-123" }));
        router.push("/setup-profile");
      }, 1500);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-900/10 rounded-full blur-[100px]" />
      </div>

      <div id="recaptcha-container"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px]"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.4)] mb-4">
            <ShieldCheck size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">FIXOO</h1>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-1">Pro Services at Home</p>
        </div>

        {/* Main Card */}
        <div className="glass-card p-6 rounded-[2rem] border border-white/10">
          <AnimatePresence mode="wait">
            {!otpSent ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold">Welcome Back</h2>
                  <p className="text-gray-500 text-sm">Enter your phone number to sign in.</p>
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-zinc-400 font-bold border-r border-zinc-800 pr-3 h-6">
                    <span className="text-sm">+91</span>
                  </div>
                  <input 
                    type="tel"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="input-luxury pl-16 py-4"
                  />
                </div>

                <button 
                  onClick={handleSendOTP}
                  disabled={phone.length !== 10 || loading}
                  className="btn-luxury w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Continue <ArrowRight size={18} /></>}
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-zinc-800"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-zinc-500 uppercase tracking-widest">or connect with</span>
                  <div className="flex-grow border-t border-zinc-800"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center gap-2 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all text-xs font-bold"
                  >
                    <Globe size={16} className="text-red-500" /> Google
                  </button>
                  <button 
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center gap-2 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all text-xs font-bold"
                  >
                    <Laptop size={16} className="text-blue-500" /> Facebook
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold">Verification</h2>
                  <p className="text-gray-500 text-sm">Enter the code sent to <b>+91 {phone}</b></p>
                </div>

                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input 
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const newOtp = [...otp];
                        newOtp[idx] = val;
                        setOtp(newOtp);
                        if (val && idx < 5) document.getElementById(`otp-${idx+1}`)?.focus();
                      }}
                      className="w-full aspect-square bg-zinc-900 border border-zinc-800 rounded-xl text-center text-xl font-bold focus:border-red-500 transition-all outline-none"
                    />
                  ))}
                </div>

                <button 
                  onClick={handleVerifyOTP}
                  disabled={otp.some(d => !d) || loading}
                  className="btn-luxury w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                   {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify & Sign In"}
                </button>

                <p className="text-center text-xs text-zinc-500">
                  Didn&apos;t get code? <button onClick={() => setOtpSent(false)} className="text-red-500 font-bold ml-1">Retry</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <footer className="mt-10 text-[10px] text-zinc-600 text-center max-w-[280px] leading-relaxed">
        By continuing, you agree to Fixoo&apos;s <span className="text-zinc-400 underline">Terms of Service</span> and <span className="text-zinc-400 underline">Privacy Policy</span>
      </footer>
    </div>
  );
}
