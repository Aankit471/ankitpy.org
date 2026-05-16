"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ServiceCategories from "@/components/ServiceCategories";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Search, Star, Clock } from "lucide-react";

const TRENDING_SERVICES = [
  { id: "s1", name: "Full Home Cleaning", price: "₹1,499", rating: "4.8", time: "4-5 hrs", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=400" },
  { id: "s2", name: "AC Servicing", price: "₹499", rating: "4.9", time: "1-2 hrs", image: "https://images.unsplash.com/photo-1621905252507-b35222073180?auto=format&fit=crop&q=80&w=400" },
  { id: "s3", name: "Electrician Visit", price: "₹199", rating: "4.7", time: "30 mins", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400" },
  { id: "s4", name: "Plumbing Repair", price: "₹299", rating: "4.6", time: "1 hr", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400" },
];

export default function ExplorePage() {
  return (
    <ProtectedRoute>
      <main style={{ minHeight: "100vh", background: "var(--background)", paddingBottom: "100px" }}>
        <Header />
        
        <div className="container" style={{ marginTop: "1rem" }}>
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
              type="text" 
              placeholder="Search for 'AC Repair', 'Cleaning'..." 
              className="input-luxury pl-12 py-3 bg-zinc-900/80 border-zinc-800"
            />
          </div>

          <h1 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "1.5rem", fontFamily: "var(--font-outfit)" }}>Browse Categories</h1>
          <ServiceCategories />
          
          <section style={{ marginTop: "2.5rem" }}>
             <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "1rem", fontFamily: "var(--font-outfit)" }}>Trending Services</h2>
             <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                {TRENDING_SERVICES.map((service) => (
                  <div key={service.id} className="premium-card" style={{ padding: "0.75rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      style={{ width: "80px", height: "80px", borderRadius: "12px", objectFit: "cover" }} 
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 700 }}>{service.name}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "2px", background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>
                          <Star size={10} fill="currentColor" /> {service.rating}
                        </div>
                      </div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary)", marginTop: "4px" }}>{service.price}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px", fontSize: "12px", color: "var(--muted)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={12} /> {service.time}
                        </div>
                        <button style={{ color: "var(--primary)", fontWeight: 700 }}>Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </section>

          <section style={{ marginTop: "2rem" }}>
             <div className="premium-card" style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)", color: "white", padding: "1.5rem" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "4px" }}>House Painting</h3>
                <p style={{ fontSize: "13px", opacity: 0.9 }}>Transform your home with our top-rated painters. Book a free consultation.</p>
                <button style={{ marginTop: "1rem", background: "white", color: "#4F46E5", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: 700, fontSize: "13px" }}>Get Quote</button>
             </div>
          </section>
        </div>
        <BottomNav />
      </main>
    </ProtectedRoute>
  );
}
