import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Search, CalendarDays } from "lucide-react";
import CreateAttendanceDialog from "../components/CreateAttendanceDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    useCompanyAttendance,
    useDeleteAttendance,
} from "../hooks/useAttendance";

import { useProjects } from "../../projects/hooks/useProjects";
import { useUsers } from "../../users/hooks/useUsers";

import EditAttendanceDialog from "../components/EditAttendanceDialog";

function AttendancePage() {
    const [search, setSearch] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [projectId, setProjectId] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [date, setDate] = useState("");

    const deleteMutation = useDeleteAttendance();

    // Projects
    const {
        data: projectsData,
        isLoading: projectsLoading,
    } = useProjects();

    const projects = projectsData?.data ?? [];

    // Employees
    const {
        data: usersData,
        isLoading: usersLoading,
    } = useUsers();

    const users = usersData?.data ?? [];

    // Company Attendance
    const {
        data: attendanceData,
        isLoading: attendanceLoading,
        isError,
        error,
    } = useCompanyAttendance({
        employee: employeeId || undefined,
        project: projectId || undefined,

        status:
            statusFilter === "ALL"
                ? undefined
                : statusFilter,

        date: date || undefined,
    });

    const attendance = attendanceData?.data ?? [];

    // Search filtering
    const filteredAttendance = useMemo(() => {
        const query = search.trim().toLowerCase();

        return attendance.filter((record) => {
            const employeeName =
                `${record.employee?.firstName || ""} ${record.employee?.lastName || ""
                    }`.toLowerCase();

            const employeeEmail =
                record.employee?.email?.toLowerCase() || "";

            const projectName =
                record.project?.projectName?.toLowerCase() || "";

            const projectCode =
                record.project?.projectCode?.toLowerCase() || "";

            return (
                !query ||
                employeeName.includes(query) ||
                employeeEmail.includes(query) ||
                projectName.includes(query) ||
                projectCode.includes(query)
            );
        });
    }, [attendance, search]);

    // Attendance Summary
    const attendanceSummary = useMemo(() => {
        return {
            total: filteredAttendance.length,

            present: filteredAttendance.filter(
                (record) => record.status === "PRESENT"
            ).length,

            absent: filteredAttendance.filter(
                (record) => record.status === "ABSENT"
            ).length,

            halfDay: filteredAttendance.filter(
                (record) => record.status === "HALF_DAY"
            ).length,

            leave: filteredAttendance.filter(
                (record) => record.status === "LEAVE"
            ).length,
        };
    }, [filteredAttendance]);

    // Delete attendance
    const handleDelete = async (attendanceId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this attendance record?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteMutation.mutateAsync(attendanceId);

            toast.success(
                "Attendance deleted successfully."
            );
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to delete attendance."
            );
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-600">
                        Management
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                        Attendance
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        View and manage employee attendance across projects.
                    </p>
                </div>

                <CreateAttendanceDialog />
            </section>

            {/* Filters */}
            <Card className="border-slate-200 bg-white shadow-none">
                <CardContent className="p-4">
                    <div className="grid gap-3 md:grid-cols-5">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <Input
                                type="search"
                                placeholder="Search..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                className="h-10 pl-9"
                            />
                        </div>

                        {/* Employee */}
                        <select
                            value={employeeId}
                            onChange={(event) =>
                                setEmployeeId(event.target.value)
                            }
                            disabled={usersLoading}
                            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="">
                                {usersLoading
                                    ? "Loading employees..."
                                    : "All employees"}
                            </option>

                            {users.map((user) => (
                                <option
                                    key={user._id}
                                    value={user._id}
                                >
                                    {user.firstName} {user.lastName}
                                </option>
                            ))}
                        </select>

                        {/* Project */}
                        <select
                            value={projectId}
                            onChange={(event) =>
                                setProjectId(event.target.value)
                            }
                            disabled={projectsLoading}
                            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="">
                                {projectsLoading
                                    ? "Loading projects..."
                                    : "All projects"}
                            </option>

                            {projects.map((project) => (
                                <option
                                    key={project._id}
                                    value={project._id}
                                >
                                    {project.projectName}
                                </option>
                            ))}
                        </select>

                        {/* Status */}
                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(event.target.value)
                            }
                            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="ALL">
                                All statuses
                            </option>

                            <option value="PRESENT">
                                Present
                            </option>

                            <option value="ABSENT">
                                Absent
                            </option>

                            <option value="HALF_DAY">
                                Half Day
                            </option>

                            <option value="LEAVE">
                                Leave
                            </option>
                        </select>

                        {/* Date */}
                        <Input
                            type="date"
                            value={date}
                            onChange={(event) =>
                                setDate(event.target.value)
                            }
                            className="h-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                <SummaryCard
                    label="Total Records"
                    value={attendanceSummary.total}
                />

                <SummaryCard
                    label="Present"
                    value={attendanceSummary.present}
                />

                <SummaryCard
                    label="Absent"
                    value={attendanceSummary.absent}
                />

                <SummaryCard
                    label="Half Day"
                    value={attendanceSummary.halfDay}
                />

                <SummaryCard
                    label="Leave"
                    value={attendanceSummary.leave}
                />
            </div>

            {/* Loading */}
            {attendanceLoading && (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-24 animate-pulse rounded-xl border border-slate-200 bg-white"
                        />
                    ))}
                </div>
            )}

            {/* Error */}
            {isError && (
                <Card className="border-red-200 bg-red-50 shadow-none">
                    <CardContent className="p-6">
                        <h2 className="font-semibold text-red-900">
                            Unable to load attendance
                        </h2>

                        <p className="mt-1 text-sm text-red-700">
                            {error?.response?.data?.message ||
                                "Something went wrong."}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Empty */}
            {!attendanceLoading &&
                !isError &&
                filteredAttendance.length === 0 && (
                    <Card className="border-slate-200 bg-white shadow-none">
                        <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                                <CalendarDays className="h-6 w-6 text-blue-600" />
                            </div>

                            <h2 className="mt-4 text-sm font-semibold text-slate-900">
                                No attendance records
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {search ||
                                    employeeId ||
                                    projectId ||
                                    date ||
                                    statusFilter !== "ALL"
                                    ? "No attendance records match your filters."
                                    : "No attendance records have been created yet."}
                            </p>
                        </CardContent>
                    </Card>
                )}

            {/* Records */}
            {!attendanceLoading &&
                !isError &&
                filteredAttendance.length > 0 && (
                    <div className="space-y-3">
                        {filteredAttendance.map((record) => (
                            <Card
                                key={record._id}
                                className="border-slate-200 bg-white shadow-none transition-shadow hover:shadow-sm"
                            >
                                <CardContent className="p-5">
                                    {/* Employee + Status */}
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                                                {record.employee?.firstName?.[0]}
                                                {record.employee?.lastName?.[0]}
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {record.employee?.firstName}{" "}
                                                    {record.employee?.lastName}
                                                </p>

                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    {record.employee?.email ||
                                                        record.employee?.role ||
                                                        "Employee"}
                                                </p>
                                            </div>
                                        </div>

                                        <AttendanceStatusBadge
                                            status={record.status}
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-4">
                                        <InfoItem
                                            label="Project"
                                            value={
                                                record.project?.projectName || "—"
                                            }
                                        />

                                        <InfoItem
                                            label="Date"
                                            value={formatDate(record.date)}
                                        />

                                        <InfoItem
                                            label="Check In"
                                            value={record.checkIn || "—"}
                                        />

                                        <InfoItem
                                            label="Check Out"
                                            value={record.checkOut || "—"}
                                        />
                                    </div>

                                    {/* Remarks */}
                                    {record.remarks && (
                                        <div className="mt-4 rounded-md bg-slate-50 px-3 py-2">
                                            <p className="text-xs text-slate-400">
                                                Remarks
                                            </p>

                                            <p className="mt-1 text-xs text-slate-600">
                                                {record.remarks}
                                            </p>
                                        </div>
                                    )}

                                    {/* Marked By */}
                                    {record.markedBy && (
                                        <p className="mt-3 text-[11px] text-slate-400">
                                            Marked by{" "}
                                            {record.markedBy.firstName}{" "}
                                            {record.markedBy.lastName}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-3">
                                        <EditAttendanceDialog
                                            attendance={record}
                                        />

                                        <button
                                            type="button"
                                            disabled={deleteMutation.isPending}
                                            onClick={() =>
                                                handleDelete(record._id)
                                            }
                                            className="rounded-md px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {deleteMutation.isPending
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
        </div>
    );
}

function SummaryCard({ label, value }) {
    return (
        <Card className="border-slate-200 bg-white shadow-none">
            <CardContent className="p-4">
                <p className="text-xs text-slate-400">
                    {label}
                </p>

                <p className="mt-1 text-xl font-semibold text-slate-900">
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}

function AttendanceStatusBadge({ status }) {
    const styles = {
        PRESENT: "bg-emerald-50 text-emerald-700",
        ABSENT: "bg-red-50 text-red-700",
        HALF_DAY: "bg-amber-50 text-amber-700",
        LEAVE: "bg-blue-50 text-blue-700",
    };

    const labels = {
        PRESENT: "Present",
        ABSENT: "Absent",
        HALF_DAY: "Half Day",
        LEAVE: "Leave",
    };

    return (
        <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[status] ||
                "bg-slate-100 text-slate-600"
                }`}
        >
            {labels[status] || status}
        </span>
    );
}

function InfoItem({ label, value }) {
    return (
        <div>
            <p className="text-xs text-slate-400">
                {label}
            </p>

            <p className="mt-1 truncate text-xs font-medium text-slate-700">
                {value}
            </p>
        </div>
    );
}

function formatDate(date) {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default AttendancePage;