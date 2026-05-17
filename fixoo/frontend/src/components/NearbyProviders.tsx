"use client";

import { Star, MapPin } from "lucide-react";
import Image from "next/image";

const providers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    service: "Electrician",
    rating: 4.8,
    distance: "1.2 km",
    price: "₹199",
    status: "available",
    image: "https://i.pravatar.cc/150?u=rajesh"
  },
  {
    id: 2,
    name: "Sunita Devi",
    service: "Home Cleaning",
    rating: 4.9,
    distance: "0.8 km",
    price: "₹299",
    status: "busy",
    image: "https://i.pravatar.cc/150?u=sunita"
  },
  {
    id: 3,
    name: "Amit Singh",
    service: "Plumber",
    rating: 4.7,
    distance: "2.5 km",
    price: "₹149",
    status: "available",
    image: "https://i.pravatar.cc/150?u=amit"
  }
];

const NearbyProviders = () => {
  return (
    <section style={{ padding: "0 1rem 1.5rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-outfit)" }}>Nearby Active Pros</h2>
          <p style={{ fontSize: "12px", color: "var(--muted)" }}>Verified professionals near you</p>
        </div>
      </div>
      
      <div style={{ display: "flex", overflowX: "auto", gap: "1rem", paddingBottom: "0.5rem", scrollbarWidth: "none" }}>
        {providers.map((pro) => (
          <div key={pro.id} className="premium-card" style={{ minWidth: "260px", padding: "1rem" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <div style={{ position: "relative" }}>
                <Image 
                  src={pro.image} 
                  alt={pro.name} 
                  width={60}
                  height={60}
                  style={{ borderRadius: "12px", objectFit: "cover" }} 
                />
                <div style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  border: "2px solid var(--card-bg)",
                  background: pro.status === "available" ? "var(--available)" : "var(--busy)"
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700 }}>{pro.name}</h3>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "4px" }}>{pro.service}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 700 }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    {pro.rating}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--muted)" }}>
                    <MapPin size={12} />
                    {pro.distance}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
              <div>
                <p style={{ fontSize: "10px", color: "var(--muted)", fontWeight: 600 }}>Starts from</p>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--primary)" }}>{pro.price}</p>
              </div>
              <button className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "13px" }}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyProviders;
