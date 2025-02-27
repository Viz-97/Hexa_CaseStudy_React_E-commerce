// AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        role: localStorage.getItem("role") || "user",
        userId: localStorage.getItem("userId") || null,
        sellerId: localStorage.getItem("sellerId") || null,
    });

    // Function to set authentication data for both login and register
    const setAuth = (role, id) => {
        if (role === "user") {
            setAuthData({ role, userId: id, sellerId: null });
            localStorage.setItem("role", role);
            localStorage.setItem("userId", id);
            localStorage.removeItem("sellerId");
        } else if (role === "seller") {
            setAuthData({ role, userId: null, sellerId: id });
            localStorage.setItem("role", role);
            localStorage.setItem("sellerId", id);
            localStorage.removeItem("userId");
        }
    };

    // Logout functionality: clear state and local storage
    const logout = () => {
        setAuthData({ role: "user", userId: null, sellerId: null });
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ authData, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
