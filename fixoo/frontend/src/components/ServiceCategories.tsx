"use client";

import Link from "next/link";
import { 
  Droplets, Zap, Hammer, Sparkles, UserCheck, 
  Wind, Tv, Paintbrush, ShieldCheck, Car, 
  Trash2, Waves, Video, Sofa, ShoppingBag, 
  Refrigerator, WashingMachine, Bug
} from "lucide-react";

const categories = [
  { id: "plumber", name: "Plumber", icon: Droplets, color: "#3B82F6" },
  { id: "electrician", name: "Electrician", icon: Zap, color: "#EAB308" },
  { id: "carpenter", name: "Carpenter", icon: Hammer, color: "#92400E" },
  { id: "cleaning", name: "Cleaning", icon: Sparkles, color: "#10B981" },
  { id: "maid", name: "Maid", icon: UserCheck, color: "#EC4899" },
  { id: "ac", name: "AC Repair", icon: Wind, color: "#06B6D4" },
  { id: "appliance", name: "Appliance", icon: Tv, color: "#6366F1" },
  { id: "painter", name: "Painter", icon: Paintbrush, color: "#F43F5E" },
  { id: "pest", name: "Pest Control", icon: Bug, color: "#7C2D12" },
  { id: "car-wash", name: "Car Wash", icon: Car, color: "#2563EB" },
  { id: "laundry", name: "Laundry", icon: ShoppingBag, color: "#8B5CF6" },
  { id: "cctv", name: "CCTV", icon: Video, color: "#1F2937" },
];

const ServiceCategories = () => {
  return (
    <section style={{ padding: "1.5rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-outfit)" }}>Services</h2>
        <button style={{ color: "var(--primary)", fontSize: "14px", fontWeight: 600, background: "none", border: "none" }}>See All</button>
      </div>
      <div className="grid-categories" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/services/${cat.id}`} style={{ textDecoration: "none" }}>
            <div className="flex-center" style={{ flexDirection: "column", gap: "8px" }}>
              <div className="flex-center" style={{ 
                width: "56px", 
                height: "56px", 
                background: "var(--card-bg)", 
                borderRadius: "16px",
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--border)",
                color: cat.color
              }}>
                <cat.icon size={24} />
              </div>
              <span style={{ fontSize: "11px", fontWeight: 600, textAlign: "center", color: "var(--muted)" }}>{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceCategories;
