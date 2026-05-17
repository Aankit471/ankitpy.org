"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, isMockMode } from "@/lib/firebaseConfig";

interface AuthContextType {
  user: User | any | null;
  loading: boolean;
  isMock: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isMock: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Handle Mock Mode
    if (isMockMode) {
      const mockUser = localStorage.getItem("fixoo_mock_user");
      if (mockUser) setUser(JSON.parse(mockUser));
      setLoading(false);
      return;
    }

    // 2. Handle Real Firebase Mode
    if (auth && typeof auth.onAuthStateChanged === "function") {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      console.warn("Firebase Auth not initialized correctly. Falling back to null user.");
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isMock: isMockMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
