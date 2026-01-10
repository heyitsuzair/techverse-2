"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getFromCookie, setInCookie, removeCookie } from "@/utils/cookies";
import { getCurrentUser, refreshAccessToken } from "@/lib/api/auth";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refreshUser: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get user from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Verify token is still valid by calling /api/auth/me
        const accessToken = getFromCookie("accessToken");
        if (accessToken) {
          try {
            const userData = await getCurrentUser(accessToken);
            setUser(userData.user);
            localStorage.setItem("user", JSON.stringify(userData.user));
          } catch (error) {
            // Token might be expired, try to refresh
            const refreshToken = getFromCookie("refreshToken");
            if (refreshToken) {
              try {
                const tokens = await refreshAccessToken(refreshToken);
                setInCookie("accessToken", tokens.accessToken, 7);
                setInCookie("refreshToken", tokens.refreshToken, 7);
                
                // Get user data with new token
                const userData = await getCurrentUser(tokens.accessToken);
                setUser(userData.user);
                localStorage.setItem("user", JSON.stringify(userData.user));
              } catch (refreshError) {
                // Refresh failed, clear auth state
                logout();
              }
            } else {
              // No refresh token, clear auth state
              logout();
            }
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData, tokens) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setInCookie("accessToken", tokens.accessToken, 7);
    setInCookie("refreshToken", tokens.refreshToken, 7);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    removeCookie("accessToken");
    removeCookie("refreshToken");
  };

  const refreshUser = async () => {
    const accessToken = getFromCookie("accessToken");
    if (accessToken) {
      try {
        const userData = await getCurrentUser(accessToken);
        setUser(userData.user);
        localStorage.setItem("user", JSON.stringify(userData.user));
      } catch (error) {
        console.error("Error refreshing user:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
