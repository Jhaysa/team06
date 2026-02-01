"use client";

import React, { createContext, useContext } from "react";
import type { User } from "firebase/auth";
import useAuth from "./useAuth";

type AuthState = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const { user, loading } = useAuth();
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

export default AuthProvider;