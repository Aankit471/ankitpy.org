"use client";

import { ArrowLeft, Phone, MessageSquare, MapPin, Navigation, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TrackingPage() {
  const router = useRouter();
  const [eta, setEta] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#f0f2f5", display: "flex", flexDirection: "column" }}>
      {/* Map View Placeholder */}
      <div style={{ flex: 1, position: "relative", background: "#e5e7eb", overflow: "hidden" }}>
        {/* Mock Map Background */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", 
          backgroundSize: "40px 40px",
          opacity: 0.3
        }} />
        
        {/* Map Header */}
        <div style={{ position: "absolute", top: "1rem", left: "1rem", right: "1rem", display: "flex", justifyContent: "space-between", zIndex: 10 }}>
          <button 
            onClick={() => router.push("/home")}
            className="flex-center"
            style={{ width: "44px", height: "44px", borderRadius: "50%", background: "white", border: "none", boxShadow: "var(--shadow-md)" }}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="glass" style={{ padding: "8px 16px", borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", gap: "8px" }}>
             <Clock size={16} color="var(--primary)" />
             <span style={{ fontSize: "14px", fontWeight: 700 }}>Arriving in {eta} mins</span>
          </div>
        </div>

        {/* Mock Map Markers */}
        <div style={{ position: "absolute", top: "40%", left: "30%", color: "var(--primary)" }}>
           <div style={{ 
             width: "48px", 
             height: "48px", 
             background: "rgba(0, 82, 204, 0.2)", 
             borderRadius: "50%", 
             display: "flex", 
             alignItems: "center", 
             justifyContent: "center",
             animation: "pulse 2s infinite" 
           }}>
             <div style={{ width: "24px", height: "24px", background: "var(--primary)", borderRadius: "50%", border: "4px solid white" }} />
           </div>
        </div>

        <div style={{ position: "absolute", top: "60%", right: "30%", color: "var(--danger)" }}>
           <MapPin size={32} />
        </div>

        {/* Floating Route Line (Visual) */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
           <path 
             d="M100 300 Q 200 250 300 450" 
             fill="none" 
             stroke="var(--primary)" 
             strokeWidth="4" 
             strokeDasharray="8 8"
           />
        </svg>
      </div>

      {/* Bottom Sheet */}
      <div className="glass" style={{ 
        padding: "1.5rem", 
        borderTopLeftRadius: "24px", 
        borderTopRightRadius: "24px",
        boxShadow: "0 -10px 20px rgba(0,0,0,0.05)",
        zIndex: 20
      }}>
        <div style={{ width: "40px", height: "4px", background: "#e2e8f0", borderRadius: "2px", margin: "0 auto 1.5rem" }} />
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
           <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <img 
                src="https://i.pravatar.cc/150?u=rajesh" 
                alt="Rajesh" 
                style={{ width: "56px", height: "56px", borderRadius: "16px" }} 
              />
              <div>
                <h2 style={{ fontSize: "16px", fontWeight: 800 }}>Rajesh Kumar</h2>
                <p style={{ fontSize: "12px", color: "var(--muted)" }}>Electrician • KA 05 MT 1234</p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                   <Star size={12} fill="#F59E0B" color="#F59E0B" />
                   <span style={{ fontSize: "12px", fontWeight: 700 }}>4.8</span>
                </div>
              </div>
           </div>
           <div style={{ display: "flex", gap: "10px" }}>
              <button className="flex-center" style={{ width: "48px", height: "48px", borderRadius: "16px", background: "#E8F5E9", color: "#2E7D32", border: "none" }}>
                 <Phone size={20} />
              </button>
              <button className="flex-center" style={{ width: "48px", height: "48px", borderRadius: "16px", background: "rgba(0, 82, 204, 0.1)", color: "var(--primary)", border: "none" }}>
                 <MessageSquare size={20} />
              </button>
           </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
           <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px", background: "var(--background)", borderRadius: "var(--radius-md)" }}>
              <div style={{ color: "var(--muted)" }}>
                 <Navigation size={20} />
              </div>
              <div style={{ flex: 1 }}>
                 <p style={{ fontSize: "10px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase" }}>Current Job</p>
                 <p style={{ fontSize: "14px", fontWeight: 700 }}>Switchboard Repair</p>
              </div>
           </div>
           
           <button className="btn-primary" style={{ width: "100%", height: "56px", borderRadius: "var(--radius-lg)", background: "var(--foreground)", color: "white" }}>
              Share Live Location
           </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
