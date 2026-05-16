"use client";

import { Home, Calendar, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/home" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Calendar, label: "Bookings", href: "/bookings" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="glass" style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: "calc(64px + var(--safe-area-bottom))",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: "var(--safe-area-bottom)",
      borderTop: "1px solid var(--border)",
      zIndex: 100,
    }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.label} href={item.href} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            color: isActive ? "var(--primary)" : "var(--muted)",
            transition: "color 0.2s ease",
          }}>
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: "10px", fontWeight: 600 }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
