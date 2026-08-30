import { useMemo, useState } from "react";
import { Mail, Phone, Search, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import CreateEmployeeDialog from "../components/CreateEmployeeDialog";
import EditEmployeeDialog from "../components/EditEmployeeDialog";
import EmployeeProjectsDialog from "../components/EmployeeProjectDialog";
import EmployeeStatusButton from "../components/EmployeeStatusButton";
import { useUsers } from "../hooks/useUsers";

function UsersPage() {
    const [search, setSearch] = useState("");

    const { data, isLoading, isError, error } = useUsers();

    const users = data?.data ?? [];

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return users;
        }

        return users.filter((user) => {
            const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
            const role = user.role || "";
            const email = user.email || "";
            const phone = user.phone || "";

            return (
                fullName.toLowerCase().includes(query) ||
                role.toLowerCase().includes(query) ||
                email.toLowerCase().includes(query) ||
                phone.toLowerCase().includes(query)
            );
        });
    }, [search, users]);

    return (
        <div className="space-y-8">
            <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B9073]">
                        Management
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C] sm:text-[34px]">
                        Employees
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736B]">
                        Manage workforce profiles, status, and project assignments.
                    </p>
                </div>

                <CreateEmployeeDialog />
            </section>

            <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_8px_24px_rgba(25,26,28,0.035)]">
                <CardContent className="p-4">
                    <div className="relative w-full sm:max-w-[420px]">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8E8A81]" />

                        <Input
                            type="search"
                            placeholder="Search employees, role, email..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="h-10 rounded-lg border-[#D7DED9] bg-white/85 pl-10 text-sm text-[#191A1C] shadow-none placeholder:text-[#A49F95] focus:border-[#C9952E] focus:ring-2 focus:ring-[#F5EBD5]"
                        />
                    </div>
                </CardContent>
            </Card>

            {isLoading && (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-[220px] animate-pulse rounded-xl border border-[#D5DDD8] bg-[#E7ECE8]"
                        />
                    ))}
                </div>
            )}

            {isError && (
                <Card className="rounded-xl border-[#EAD3D0] bg-[#FDF8F7] shadow-[0_10px_30px_rgba(25,26,28,0.04)]">
                    <CardContent className="p-6">
                        <h2 className="text-sm font-semibold text-[#7F403B]">
                            Unable to load employees
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-[#A9605B]">
                            {error?.response?.data?.message ||
                                "Something went wrong. Please try again."}
                        </p>
                    </CardContent>
                </Card>
            )}

            {!isLoading && !isError && filteredUsers.length === 0 && (
                <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)]">
                    <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#7E845E] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
                            <Users className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-base font-semibold text-[#191A1C]">
                            {search ? "No employees found" : "No employees yet"}
                        </h2>

                        <p className="mt-1 max-w-sm text-sm leading-6 text-[#77736B]">
                            {search
                                ? "Try a different name, role, email, or phone number."
                                : "Create the first employee profile to start assigning work."}
                        </p>
                    </CardContent>
                </Card>
            )}

            {!isLoading && !isError && filteredUsers.length > 0 && (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {filteredUsers.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}

function UserCard({ user }) {
    const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();

    return (
        <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7]">
            <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E7E9D7] text-sm font-semibold text-[#7E845E]">
                            {initials || "U"}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-semibold text-[#191A1C]">
                                {user.firstName || "Unknown"} {user.lastName || ""}
                            </h2>

                            <p className="mt-1 text-xs text-[#77736B]">
                                {formatRole(user.role)}
                            </p>
                        </div>
                    </div>

                    <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            user.isActive
                                ? "bg-[#EAF0EB] text-[#55705F]"
                                : "bg-[#F4E8E6] text-[#A9605B]"
                        }`}
                    >
                        {user.isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <InfoRow icon={Mail} label="Email" value={user.email || "Not provided"} />
                    <InfoRow icon={Phone} label="Phone" value={user.phone || "Not provided"} />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                    <EmployeeProjectsDialog user={user} />
                    <EditEmployeeDialog user={user} />
                    <EmployeeStatusButton user={user} />
                </div>
            </CardContent>
        </Card>
    );
}

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="rounded-lg border border-[#D9E1DC] bg-white/60 px-3 py-2.5">
            <div className="flex items-center gap-2 text-[#A49F95]">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-[11px] uppercase tracking-[0.08em]">
                    {label}
                </span>
            </div>

            <p className="mt-2 break-all text-sm font-medium text-[#55524D]">
                {value}
            </p>
        </div>
    );
}

function formatRole(role) {
    if (!role) return "Employee";

    return role
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
}

export default UsersPage;