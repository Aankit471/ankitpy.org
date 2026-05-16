"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Smartphone, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = () => {
    if (!otpSent) {
      setOtpSent(true);
    } else {
      router.push("/");
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "white", display: "flex", flexDirection: "column" }}>
      {/* Hero Image / Brand */}
      <div style={{ 
        flex: 1, 
        background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "2rem",
        borderBottomLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background Circles */}
        <div style={{ position: "absolute", top: "-20px", left: "-20px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        <div style={{ position: "absolute", bottom: "40px", right: "-30px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        
        <div className="flex-center" style={{ width: "80px", height: "80px", background: "white", borderRadius: "20px", marginBottom: "1.5rem", boxShadow: "var(--shadow-lg)" }}>
          <ShieldCheck size={48} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: 900, marginBottom: "8px", fontFamily: "var(--font-outfit)" }}>Fixoo</h1>
        <p style={{ fontSize: "16px", opacity: 0.9, textAlign: "center", maxWidth: "250px" }}>Trusted professionals for all your home needs.</p>
      </div>

      {/* Login Form */}
      <div style={{ padding: "2.5rem 2rem calc(2rem + var(--safe-area-bottom))", background: "white" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>
          {otpSent ? "Verify OTP" : "Welcome Back"}
        </h2>
        <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "2rem" }}>
          {otpSent ? `Enter the 4-digit code sent to +91 ${phone}` : "Enter your mobile number to get started"}
        </p>

        {!otpSent ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "#f8fafc", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", marginBottom: "1.5rem" }}>
            <span style={{ fontWeight: 700, color: "var(--foreground)" }}>+91</span>
            <input 
              type="tel" 
              placeholder="98765 43210" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ background: "none", border: "none", outline: "none", fontSize: "16px", fontWeight: 600, width: "100%" }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", gap: "12px", marginBottom: "1.5rem", justifyContent: "center" }}>
            {[1, 2, 3, 4].map((i) => (
              <input 
                key={i}
                type="text" 
                maxLength={1}
                autoFocus={i === 1}
                style={{ width: "56px", height: "56px", borderRadius: "12px", border: "1px solid var(--border)", background: "#f8fafc", textAlign: "center", fontSize: "20px", fontWeight: 800, outline: "none" }}
              />
            ))}
          </div>
        )}

        <button 
          onClick={handleLogin}
          className="btn-primary" 
          style={{ width: "100%", height: "56px", fontSize: "16px", borderRadius: "var(--radius-lg)" }}
        >
          {otpSent ? "Login" : "Get OTP"} <ArrowRight size={20} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "2rem 0" }}>
           <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
           <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 600 }}>OR</span>
           <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>

        <button style={{ 
          width: "100%", 
          height: "56px", 
          borderRadius: "var(--radius-lg)", 
          background: "white", 
          border: "1px solid var(--border)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: "12px",
          fontSize: "14px",
          fontWeight: 700,
          color: "var(--foreground)"
        }}>
           <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: "20px" }} />
           Continue with Google
        </button>
      </div>
    </main>
  );
}
