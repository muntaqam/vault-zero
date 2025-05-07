// Dashboard.tsx
"use client";

import { columns } from "../../src/pages/columns"; // Adjust the path
import { User } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function Dashboard() {
    const data: User[] = [
        { id: "1", name: "Alice", email: "alice@example.com" },
        { id: "2", name: "Bob", email: "bob@example.com" },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
