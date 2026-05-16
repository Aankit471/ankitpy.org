"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, MapPin, Filter, Search } from "lucide-react";
import Link from "next/link";

const providers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    rating: 4.8,
    jobs: 1240,
    distance: "1.2 km",
    price: "₹199",
    status: "available",
    image: "https://i.pravatar.cc/150?u=rajesh",
    description: "Expert electrician with 10+ years experience in home wiring and appliance repair."
  },
  {
    id: 2,
    name: "Sunita Devi",
    rating: 4.9,
    jobs: 850,
    distance: "0.8 km",
    price: "₹299",
    status: "busy",
    image: "https://i.pravatar.cc/150?u=sunita",
    description: "Professional cleaning specialist. Deep cleaning and sanitization expert."
  },
  {
    id: 3,
    name: "Amit Singh",
    rating: 4.7,
    jobs: 500,
    distance: "2.5 km",
    price: "₹149",
    status: "available",
    image: "https://i.pravatar.cc/150?u=amit",
    description: "Certified plumber. Tap leaks, pipe bursts, and water tank cleaning."
  },
  {
    id: 4,
    name: "Vikram Rathore",
    rating: 4.6,
    jobs: 320,
    distance: "3.1 km",
    price: "₹249",
    status: "available",
    image: "https://i.pravatar.cc/150?u=vikram",
    description: "Modern furniture repair and woodwork specialist."
  }
];

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  return (
    <main style={{ minHeight: "100vh", background: "var(--background)", paddingBottom: "2rem" }}>
      {/* Header */}
      <div className="glass" style={{ 
        position: "sticky", 
        top: 0, 
        padding: "1rem", 
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        borderBottom: "1px solid var(--border)"
      }}>
        <button 
          onClick={() => router.back()}
          style={{ background: "none", border: "none", color: "var(--foreground)" }}
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 style={{ fontSize: "18px", fontWeight: 800, textTransform: "capitalize", fontFamily: "var(--font-outfit)" }}>
            {category.replace("-", " ")} Pros
          </h1>
          <p style={{ fontSize: "12px", color: "var(--muted)" }}>4 active pros near you</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "1rem" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
          <button style={{ 
            display: "flex", alignItems: "center", gap: "6px", 
            padding: "8px 16px", borderRadius: "var(--radius-full)", 
            background: "var(--primary)", color: "white", border: "none",
            fontSize: "13px", fontWeight: 600
          }}>
            <Filter size={14} /> Sort By
          </button>
          <button style={{ 
            padding: "8px 16px", borderRadius: "var(--radius-full)", 
            background: "var(--card-bg)", color: "var(--foreground)", border: "1px solid var(--border)",
            fontSize: "13px", fontWeight: 600
          }}>Rating 4.5+</button>
          <button style={{ 
            padding: "8px 16px", borderRadius: "var(--radius-full)", 
            background: "var(--card-bg)", color: "var(--foreground)", border: "1px solid var(--border)",
            fontSize: "13px", fontWeight: 600
          }}>Under ₹200</button>
        </div>

        {/* Provider List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {providers.map((pro) => (
            <Link key={pro.id} href={`/booking/${pro.id}?category=${category}`} style={{ textDecoration: "none" }}>
              <div className="premium-card" style={{ display: "flex", gap: "16px" }}>
                <div style={{ position: "relative" }}>
                  <img 
                    src={pro.image} 
                    alt={pro.name} 
                    style={{ width: "80px", height: "80px", borderRadius: "16px", objectFit: "cover" }} 
                  />
                  <div style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    border: "2px solid var(--card-bg)",
                    background: pro.status === "available" ? "var(--available)" : "var(--busy)"
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)" }}>{pro.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 700 }}>
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      {pro.rating}
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={12} /> {pro.distance} • {pro.jobs}+ jobs completed
                  </p>
                  <p style={{ 
                    fontSize: "12px", 
                    color: "var(--foreground)", 
                    opacity: 0.8, 
                    display: "-webkit-box", 
                    WebkitLineClamp: 1, 
                    WebkitBoxOrient: "vertical", 
                    overflow: "hidden",
                    marginBottom: "12px"
                  }}>
                    {pro.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--primary)" }}>{pro.price}</p>
                    <span style={{ 
                      fontSize: "11px", 
                      fontWeight: 700, 
                      color: pro.status === "available" ? "var(--available)" : "var(--busy)",
                      textTransform: "uppercase"
                    }}>
                      {pro.status === "available" ? "Available Now" : "Busy Soon"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
