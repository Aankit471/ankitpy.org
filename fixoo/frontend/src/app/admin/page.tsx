"use client";

import { 
  Users, Briefcase, IndianRupee, ShieldAlert, 
  Search, Bell, Settings, PieChart, ArrowUpRight,
  CheckCircle, Clock, AlertTriangle
} from "lucide-react";
import Image from "next/image";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "12,450", change: "+12%", icon: Users, color: "#2563EB" },
    { label: "Active Pros", value: "840", change: "+5%", icon: Briefcase, color: "#10B981" },
    { label: "Today's Revenue", value: "₹45,200", change: "+18%", icon: IndianRupee, color: "#F59E0B" },
    { label: "Pending Complaints", value: "12", change: "-2%", icon: ShieldAlert, color: "#F43F5E" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#F1F5F9", padding: "2rem" }}>
      {/* Admin Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "var(--foreground)" }}>Fixoo Admin Console</h1>
          <p style={{ color: "var(--muted)" }}>Platform Overview & Analytics</p>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
           <div className="premium-card" style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: "12px", background: "white" }}>
              <Search size={18} color="var(--muted)" />
              <input type="text" placeholder="Search users, bookings..." style={{ border: "none", outline: "none", fontSize: "14px" }} />
           </div>
           <button className="flex-center" style={{ width: "44px", height: "44px", borderRadius: "10px", background: "white", border: "1px solid var(--border)", position: "relative" }}>
              <Bell size={20} />
              <span style={{ position: "absolute", top: "10px", right: "10px", width: "8px", height: "8px", background: "var(--danger)", borderRadius: "50%", border: "2px solid white" }} />
           </button>
           <button className="flex-center" style={{ width: "44px", height: "44px", borderRadius: "10px", background: "white", border: "1px solid var(--border)" }}>
              <Settings size={20} />
           </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
        {stats.map((s) => (
          <div key={s.label} className="premium-card" style={{ background: "white" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
               <div className="flex-center" style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${s.color}15`, color: s.color }}>
                  <s.icon size={24} />
               </div>
               <div style={{ display: "flex", alignItems: "center", gap: "4px", color: s.change.startsWith("+") ? "var(--success)" : "var(--danger)", fontSize: "12px", fontWeight: 700 }}>
                  {s.change} <ArrowUpRight size={14} />
               </div>
            </div>
            <p style={{ fontSize: "14px", color: "var(--muted)", fontWeight: 600 }}>{s.label}</p>
            <h2 style={{ fontSize: "28px", fontWeight: 800 }}>{s.value}</h2>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Recent Bookings Table */}
        <div className="premium-card" style={{ background: "white" }}>
           <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "1.5rem" }}>Live Bookings</h2>
           <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "var(--muted)", fontSize: "12px", borderBottom: "1px solid var(--border)" }}>
                   <th style={{ padding: "12px 0" }}>PROVIDER</th>
                   <th>CUSTOMER</th>
                   <th>SERVICE</th>
                   <th>STATUS</th>
                   <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {[
                  { pro: "Rajesh K.", user: "Ankit S.", service: "AC Repair", status: "On Way", amount: "₹499", color: "var(--primary)" },
                  { pro: "Sunita D.", user: "Neha R.", service: "Cleaning", status: "In Progress", amount: "₹850", color: "var(--success)" },
                  { pro: "Amit S.", user: "Rahul M.", service: "Plumber", status: "Pending", amount: "₹199", color: "var(--warning)" },
                  { pro: "Vikram R.", user: "Suresh P.", service: "Furniture", status: "Completed", amount: "₹1,200", color: "var(--muted)" },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i === 3 ? "none" : "1px solid #F1F5F9" }}>
                     <td style={{ padding: "16px 0", fontWeight: 700 }}>{row.pro}</td>
                     <td>{row.user}</td>
                     <td>{row.service}</td>
                     <td>
                        <span style={{ 
                          padding: "4px 10px", 
                          borderRadius: "var(--radius-full)", 
                          background: `${row.color}15`, 
                          color: row.color,
                          fontSize: "11px",
                          fontWeight: 700
                        }}>{row.status}</span>
                     </td>
                     <td style={{ fontWeight: 800 }}>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        {/* System Health */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
           <div className="premium-card" style={{ background: "white" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "1rem" }}>Provider Verification</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                 {[1, 2, 3].map((i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
                       <Image src={`https://i.pravatar.cc/150?u=pro${i}`} width={32} height={32} style={{ borderRadius: "8px" }} alt="Pro" />
                       <div style={{ flex: 1 }}>
                          <p style={{ fontSize: "13px", fontWeight: 700 }}>Sanjay Mehta</p>
                          <p style={{ fontSize: "10px", color: "var(--muted)" }}>Aadhaar Pending</p>
                       </div>
                       <button className="flex-center" style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", color: "white", border: "none" }}>
                          <CheckCircle size={16} />
                       </button>
                    </div>
                 ))}
              </div>
              <button style={{ width: "100%", marginTop: "1rem", padding: "8px", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: "13px", fontWeight: 600 }}>View All Queue</button>
           </div>

           <div className="premium-card" style={{ background: "var(--foreground)", color: "white" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "4px" }}>Promo Campaigns</h2>
              <p style={{ fontSize: "12px", opacity: 0.7, marginBottom: "1rem" }}>&quot;DIWALI50&quot; is active</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                       <PieChart size={20} />
                    </div>
                    <div>
                       <p style={{ fontSize: "14px", fontWeight: 700 }}>2,450 Uses</p>
                       <p style={{ fontSize: "10px", opacity: 0.6 }}>Redeemed today</p>
                    </div>
                 </div>
                 <button style={{ background: "white", color: "var(--foreground)", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 700 }}>Manage</button>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
