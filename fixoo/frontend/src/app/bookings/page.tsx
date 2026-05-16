"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { ClipboardList, Calendar, CheckCircle2, Clock } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function BookingsPage() {
  const bookings = [
    { id: 1, pro: "Rajesh Kumar", service: "Electrician", date: "Today, 12:30 PM", status: "Upcoming", price: "₹199" },
    { id: 2, pro: "Sunita Devi", service: "Cleaning", date: "25 Apr, 10:00 AM", status: "Completed", price: "₹850" },
  ];

  return (
    <ProtectedRoute>
      <main style={{ minHeight: "100vh", background: "var(--background)", paddingBottom: "100px" }}>
        <div className="glass" style={{ padding: "1.5rem", position: "sticky", top: 0, zIndex: 100 }}>
          <h1 style={{ fontSize: "20px", fontWeight: 800 }}>My Bookings</h1>
        </div>

        <div className="container" style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}>
             <button style={{ padding: "8px 16px", borderRadius: "var(--radius-full)", background: "var(--primary)", color: "white", border: "none", fontSize: "13px", fontWeight: 600 }}>Active</button>
             <button style={{ padding: "8px 16px", borderRadius: "var(--radius-full)", background: "var(--card-bg)", color: "var(--foreground)", border: "1px solid var(--border)", fontSize: "13px", fontWeight: 600 }}>History</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bookings.map((b) => (
              <div key={b.id} className="premium-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ padding: "6px", borderRadius: "8px", background: b.status === "Upcoming" ? "rgba(0, 82, 204, 0.1)" : "#E8F5E9", color: b.status === "Upcoming" ? "var(--primary)" : "#2E7D32" }}>
                         {b.status === "Upcoming" ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: b.status === "Upcoming" ? "var(--primary)" : "#2E7D32" }}>{b.status}</span>
                   </div>
                   <span style={{ fontSize: "14px", fontWeight: 800 }}>{b.price}</span>
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700 }}>{b.pro}</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "8px" }}>{b.service}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--muted)" }}>
                   <Calendar size={14} /> {b.date}
                </div>
                
                {b.status === "Upcoming" && (
                  <div style={{ display: "flex", gap: "12px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                     <button className="btn-primary" style={{ flex: 1, height: "40px", fontSize: "13px" }}>Track Pro</button>
                     <button style={{ flex: 1, height: "40px", fontSize: "13px", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontWeight: 600 }}>Cancel</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </main>
    </ProtectedRoute>
  );
}
