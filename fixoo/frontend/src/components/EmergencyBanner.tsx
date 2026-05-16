"use client";

import { AlertTriangle, ChevronRight } from "lucide-react";

const EmergencyBanner = () => {
  return (
    <div style={{ padding: "0 1rem 1.5rem 1rem" }}>
      <div style={{
        background: "linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 10px 20px -5px rgba(244, 63, 94, 0.4)",
        cursor: "pointer"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ 
            background: "rgba(255, 255, 255, 0.2)", 
            padding: "10px", 
            borderRadius: "12px" 
          }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 800 }}>Need Urgent Help?</h3>
            <p style={{ fontSize: "12px", opacity: 0.9 }}>Get a pro at your door in 30 mins</p>
          </div>
        </div>
        <div style={{ 
          background: "rgba(255, 255, 255, 1)", 
          color: "#E11D48",
          padding: "6px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
