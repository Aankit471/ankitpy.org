"use client";

import { MapPin, Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="glass" style={{
      position: "sticky",
      top: 0,
      padding: "1rem",
      zIndex: 100,
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="flex-center" style={{ 
            background: "rgba(0, 82, 204, 0.1)", 
            padding: "8px", 
            borderRadius: "50%",
            color: "var(--primary)"
          }}>
            <MapPin size={20} />
          </div>
          <div>
            <p style={{ fontSize: "10px", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase" }}>Location</p>
            <p style={{ fontSize: "14px", fontWeight: 700 }}>HSR Layout, Bangalore</p>
          </div>
        </div>
        <button style={{ 
          background: "none", 
          border: "none", 
          padding: "8px", 
          position: "relative",
          color: "var(--foreground)"
        }}>
          <Bell size={24} />
          <span style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "8px",
            height: "8px",
            background: "var(--danger)",
            borderRadius: "50%",
            border: "2px solid var(--card-bg)"
          }} />
        </button>
      </div>

      <div style={{ 
        background: "var(--background)", 
        borderRadius: "var(--radius-md)", 
        display: "flex", 
        alignItems: "center", 
        padding: "0.75rem 1rem",
        gap: "12px",
        border: "1px solid var(--border)"
      }}>
        <Search size={20} color="var(--muted)" />
        <input 
          type="text" 
          placeholder="Search 'AC Repair' or 'Plumber'" 
          style={{
            background: "none",
            border: "none",
            outline: "none",
            width: "100%",
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--foreground)"
          }}
        />
      </div>
    </header>
  );
};

export default Header;
