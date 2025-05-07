"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { User } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Static mock data
    const data: User[] = [
        { id: "1", name: "Alice", email: "alice@example.com" },
        { id: "2", name: "Bob", email: "bob@example.com" },
    ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/me");
                setEmail(response.data.email);
            } catch (err: any) {
                setError(err.response?.data?.detail || "Failed to fetch user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                {email ? `${email}'s Dashboard` : "User Dashboard"}
            </h1>
            <Button
                variant="destructive"
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/register"; // or "/login" if you have that
                }}
            >
                Logout
            </Button>

            <DataTable columns={columns} data={data} />
        </div>
    );
}
