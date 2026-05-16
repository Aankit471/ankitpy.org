"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ServiceCategories from "@/components/ServiceCategories";
import NearbyProviders from "@/components/NearbyProviders";
import EmergencyBanner from "@/components/EmergencyBanner";
import { Gift } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main style={{ 
        minHeight: "100vh", 
        paddingBottom: "calc(80px + var(--safe-area-bottom))",
        background: "var(--background)"
      }}>
        <Header />
        
        <div className="container" style={{ marginTop: "1rem" }}>
          {/* Hero Section / Banner */}
          <section style={{ padding: "0 0 1.5rem 0" }}>
            <div style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem",
              color: "white",
              position: "relative",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)"
            }}>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Gift size={18} />
                  <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Special Offer</span>
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "4px", fontFamily: "var(--font-outfit)" }}>50% OFF</h2>
                <p style={{ fontSize: "14px", opacity: 0.9, maxWidth: "200px" }}>On your first Home Cleaning service this week!</p>
                <button style={{ 
                  marginTop: "1rem", 
                  background: "white", 
                  color: "var(--primary)", 
                  border: "none", 
                  padding: "0.5rem 1rem", 
                  borderRadius: "var(--radius-md)",
                  fontWeight: 700,
                  fontSize: "13px"
                }}>Claim Now</button>
              </div>
              {/* Decorative circles */}
              <div style={{ 
                position: "absolute", 
                right: "-20px", 
                bottom: "-20px", 
                width: "120px", 
                height: "120px", 
                borderRadius: "50%", 
                background: "rgba(255,255,255,0.1)" 
              }} />
            </div>
          </section>

          <ServiceCategories />
          
          <EmergencyBanner />

          <NearbyProviders />

          {/* festival offer */}
          <section style={{ padding: "0 1rem 1.5rem 1rem" }}>
             <div className="premium-card" style={{ 
               background: "#FEF3C7", 
               borderColor: "#FCD34D",
               display: "flex",
               gap: "16px",
               alignItems: "center"
             }}>
               <div style={{ fontSize: "32px" }}>🪔</div>
               <div>
                 <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#92400E" }}>Diwali Cleaning Sale</h3>
                 <p style={{ fontSize: "13px", color: "#B45309" }}>Book deep cleaning before the rush. Limited slots available!</p>
               </div>
             </div>
          </section>

          <section style={{ padding: "0 1rem 1.5rem 1rem" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-outfit)", marginBottom: "1rem" }}>Popular Services</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="premium-card" style={{ padding: "0", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=400" alt="AC" style={{ width: "100%", height: "100px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700 }}>AC Deep Cleaning</h4>
                  <p style={{ fontSize: "12px", color: "var(--muted)" }}>From ₹499</p>
                </div>
              </div>
              <div className="premium-card" style={{ padding: "0", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1621905252507-b35222073180?auto=format&fit=crop&q=80&w=400" alt="Electrician" style={{ width: "100%", height: "100px", objectFit: "cover" }} />
                <div style={{ padding: "12px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700 }}>Fan Installation</h4>
                  <p style={{ fontSize: "12px", color: "var(--muted)" }}>From ₹99</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <BottomNav />
      </main>
    </ProtectedRoute>
  );
}
