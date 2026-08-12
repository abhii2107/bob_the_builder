import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    FolderKanban,
    MapPin,
    Users,
} from "lucide-react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useProject } from "../hooks/useProjects";

function ProjectDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useProject(id);

    const project = data?.data;

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />

                <div className="h-48 animate-pulse rounded-xl border bg-white" />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="h-40 animate-pulse rounded-xl border bg-white" />
                    <div className="h-40 animate-pulse rounded-xl border bg-white" />
                </div>
            </div>
        );
    }

    if (isError || !project) {
        return (
            <Card className="border-red-200 bg-red-50 shadow-none">
                <CardContent className="p-6">
                    <h2 className="font-semibold text-red-900">
                        Unable to load project
                    </h2>

                    <p className="mt-1 text-sm text-red-700">
                        {error?.response?.data?.message ||
                            "Project not found."}
                    </p>

                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => navigate("/projects")}
                    >
                        Back to Projects
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back */}
            <Button
                variant="ghost"
                className="-ml-2 text-slate-600 hover:bg-slate-100"
                onClick={() => navigate("/projects")}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
            </Button>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <FolderKanban className="h-6 w-6 text-blue-600" />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                                {project.projectName}
                            </h1>

                            <StatusBadge status={project.status} />
                        </div>

                        <p className="mt-1 text-sm text-slate-400">
                            {project.projectCode}
                        </p>
                    </div>
                </div>

                {/* Edit Project */}
                <Button
                    variant="outline"
                    onClick={() => {
                        // We will connect the Edit dialog here next
                    }}
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Project
                </Button>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard
                    label="Budget"
                    value={formatBudget(project.budget)}
                />

                <InfoCard
                    label="Start Date"
                    value={
                        project.startDate
                            ? formatDate(project.startDate)
                            : "Not set"
                    }
                />

                <InfoCard
                    label="Estimated End"
                    value={
                        project.estimatedEndDate
                            ? formatDate(project.estimatedEndDate)
                            : "Not set"
                    }
                />

                <InfoCard
                    label="Created"
                    value={formatDate(project.createdAt)}
                />
            </div>

            {/* People + Address */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Team */}
                <Card className="border-slate-200 bg-white shadow-none">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />

                            <h2 className="text-sm font-semibold text-slate-900">
                                Project Team
                            </h2>
                        </div>

                        <div className="mt-5 space-y-4">
                            <Person
                                label="Project Manager"
                                user={project.projectManager}
                            />

                            <div className="border-t border-slate-100 pt-4">
                                <p className="text-xs text-slate-400">
                                    Site Engineers
                                </p>

                                {project.siteEngineers?.length > 0 ? (
                                    <div className="mt-2 space-y-2">
                                        {project.siteEngineers.map((engineer) => (
                                            <p
                                                key={engineer._id}
                                                className="text-sm font-medium text-slate-700"
                                            >
                                                {engineer.firstName}{" "}
                                                {engineer.lastName}
                                            </p>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-2 text-sm text-slate-500">
                                        No engineers assigned
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Address */}
                <Card className="border-slate-200 bg-white shadow-none">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-600" />

                            <h2 className="text-sm font-semibold text-slate-900">
                                Project Location
                            </h2>
                        </div>

                        <div className="mt-5 text-sm leading-6 text-slate-600">
                            {project.address ? (
                                <>
                                    {project.address.street && (
                                        <p>{project.address.street}</p>
                                    )}

                                    <p>
                                        {project.address.city}
                                        {project.address.state &&
                                            `, ${project.address.state}`}
                                    </p>

                                    <p>
                                        {project.address.country}
                                        {project.address.zipCode &&
                                            ` - ${project.address.zipCode}`}
                                    </p>
                                </>
                            ) : (
                                <p className="text-slate-400">
                                    No address provided
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <Card className="border-slate-200 bg-white shadow-none">
            <CardContent className="p-5">
                <p className="text-xs text-slate-400">{label}</p>

                <p className="mt-2 text-sm font-semibold text-slate-900">
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}

function Person({ label, user }) {
    return (
        <div>
            <p className="text-xs text-slate-400">{label}</p>

            {user ? (
                <div className="mt-2 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-700">
                            {user.firstName} {user.lastName}
                        </p>

                        <p className="text-xs text-slate-400">
                            {user.email}
                        </p>
                    </div>
                </div>
            ) : (
                <p className="mt-2 text-sm text-slate-500">
                    Not assigned
                </p>
            )}
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        PLANNING: "bg-slate-100 text-slate-600",
        IN_PROGRESS: "bg-blue-50 text-blue-700",
        COMPLETED: "bg-emerald-50 text-emerald-700",
        ON_HOLD: "bg-amber-50 text-amber-700",
        CANCELLED: "bg-red-50 text-red-700",
    };

    const label = status
        ?.toLowerCase()
        .replace("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        );

    return (
        <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[status] ||
                "bg-slate-100 text-slate-600"
                }`}
        >
            {label || "Unknown"}
        </span>
    );
}

function formatDate(date) {
    if (!date) return "Not set";

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

function formatBudget(budget) {
    if (!budget) return "₹0";

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(budget);
}

export default ProjectDetailsPage;