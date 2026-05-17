"use client";

import { useState } from "react";
import { 
  LayoutDashboard, ClipboardList, Wallet, User, 
  Power, TrendingUp, Star, MapPin, CheckCircle2, XCircle 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProviderDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  const activeJobs = [
    { id: 1, customer: "Ankit Singh", service: "AC Repair", price: "₹499", address: "HSR Layout, Sector 7", status: "active" },
    { id: 2, customer: "Priya Sharma", service: "Electrician", price: "₹199", address: "Koramangala, 4th Block", status: "pending" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "var(--background)", paddingBottom: "100px" }}>
      {/* Top Header */}
      <div className="glass" style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image src="https://i.pravatar.cc/150?u=rajesh" width={44} height={44} style={{ borderRadius: "12px" }} alt="Me" />
          <div>
            <h1 style={{ fontSize: "16px", fontWeight: 800 }}>Hi, Rajesh!</h1>
            <p style={{ fontSize: "12px", color: "var(--muted)" }}>Electrician • Top Rated</p>
          </div>
        </div>
        <button 
          onClick={() => setIsOnline(!isOnline)}
          style={{ 
            padding: "8px 16px", 
            borderRadius: "var(--radius-full)", 
            background: isOnline ? "#E8F5E9" : "#FFEBEE", 
            color: isOnline ? "#2E7D32" : "#D32F2F",
            border: "1px solid currentColor",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 700,
            fontSize: "13px"
          }}
        >
          <Power size={16} />
          {isOnline ? "ONLINE" : "OFFLINE"}
        </button>
      </div>

      <div className="container" style={{ marginTop: "1.5rem" }}>
        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "1.5rem" }}>
           <div className="premium-card" style={{ background: "var(--primary)", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                 <Wallet size={20} />
                 <TrendingUp size={16} />
              </div>
              <p style={{ fontSize: "12px", opacity: 0.8 }}>Today's Earnings</p>
              <h2 style={{ fontSize: "24px", fontWeight: 800 }}>₹2,450</h2>
           </div>
           <div className="premium-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--primary)" }}>
                 <ClipboardList size={20} />
                 <span style={{ fontSize: "12px", fontWeight: 800 }}>4/5</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--muted)" }}>Jobs Completed</p>
              <h2 style={{ fontSize: "24px", fontWeight: 800 }}>80%</h2>
           </div>
        </div>

        {/* Rating Card */}
        <div className="premium-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", border: "1px solid #FFD700", background: "linear-gradient(to right, #FFFDF0, #FFFFFF)" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="flex-center" style={{ width: "40px", height: "40px", background: "#FFD700", borderRadius: "10px", color: "white" }}>
                 <Star size={24} fill="white" />
              </div>
              <div>
                 <p style={{ fontSize: "14px", fontWeight: 800 }}>Top Provider Badge</p>
                 <p style={{ fontSize: "12px", color: "#B45309" }}>Maintain 4.5+ for bonuses</p>
              </div>
           </div>
           <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#92400E" }}>4.8</h3>
        </div>

        {/* Active Jobs */}
        <section>
          <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "1rem", fontFamily: "var(--font-outfit)" }}>Job Requests</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {activeJobs.map((job) => (
              <div key={job.id} className="premium-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                   <span style={{ 
                     fontSize: "10px", 
                     fontWeight: 800, 
                     padding: "4px 8px", 
                     borderRadius: "4px", 
                     background: job.status === "active" ? "rgba(0, 82, 204, 0.1)" : "#FFF3E0",
                     color: job.status === "active" ? "var(--primary)" : "#E65100",
                     textTransform: "uppercase"
                   }}>{job.status}</span>
                   <span style={{ fontWeight: 800, color: "var(--primary)" }}>{job.price}</span>
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>{job.customer}</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                  <ClipboardList size={14} /> {job.service}
                </p>
                <p style={{ fontSize: "13px", color: "var(--muted)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "16px" }}>
                  <MapPin size={14} /> {job.address}
                </p>
                
                <div style={{ display: "flex", gap: "12px" }}>
                   <button className="flex-center" style={{ flex: 1, height: "44px", borderRadius: "10px", background: "#E8F5E9", color: "#2E7D32", border: "none", fontWeight: 700, gap: "8px" }}>
                      <CheckCircle2 size={18} /> Accept
                   </button>
                   <button className="flex-center" style={{ flex: 1, height: "44px", borderRadius: "10px", background: "#FFEBEE", color: "#D32F2F", border: "none", fontWeight: 700, gap: "8px" }}>
                      <XCircle size={18} /> Reject
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Provider Bottom Nav */}
      <nav className="glass" style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "80px", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid var(--border)" }}>
         <div className="flex-center" style={{ flexDirection: "column", gap: "4px", color: "var(--primary)" }}>
            <LayoutDashboard size={24} />
            <span style={{ fontSize: "10px", fontWeight: 700 }}>Home</span>
         </div>
         <div className="flex-center" style={{ flexDirection: "column", gap: "4px", color: "var(--muted)" }}>
            <ClipboardList size={24} />
            <span style={{ fontSize: "10px", fontWeight: 700 }}>Jobs</span>
         </div>
         <div className="flex-center" style={{ flexDirection: "column", gap: "4px", color: "var(--muted)" }}>
            <Wallet size={24} />
            <span style={{ fontSize: "10px", fontWeight: 700 }}>Earnings</span>
         </div>
         <div className="flex-center" style={{ flexDirection: "column", gap: "4px", color: "var(--muted)" }}>
            <User size={24} />
            <span style={{ fontSize: "10px", fontWeight: 700 }}>Profile</span>
         </div>
      </nav>
    </main>
  );
}
