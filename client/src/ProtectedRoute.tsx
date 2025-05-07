// src/components/ProtectedRoute.tsx
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { JSX } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem("token");

    // No token = not logged in
    if (!token) {
        return <Navigate to="/register" replace />;
    }

    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            localStorage.removeItem("token");
            return <Navigate to="/register" replace />;
        }

        return children;
    } catch (e) {
        // Malformed or tampered token
        localStorage.removeItem("token");
        return <Navigate to="/register" replace />;
    }
}
