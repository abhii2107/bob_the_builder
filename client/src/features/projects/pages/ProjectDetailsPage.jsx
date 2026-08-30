import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    FolderKanban,
    MapPin,
    Users,
    ClipboardList,
} from "lucide-react";
import MarkAttendanceDialog from "../../attendance/components/MarkAttendanceDialog";
import {
    useProjectAttendance,
    useDeleteAttendance,
} from "../../attendance/hooks/useAttendance";
import toast from "react-hot-toast";

import {
    useProjectAssignments,
    useRemoveAssignment,
} from "../../assignments/hooks/useAssignments";

import CreateAssignmentDialog from "../../assignments/components/CreateAssignmentDialog";

import {
    useProjectTasks,
} from "../../task/hooks/useTasks";

import CreateTaskDialog from "../../task/components/CreateTaskDialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import EditProjectDialog from "../components/EditProjectDialog";
import { useProject } from "../hooks/useProjects";
import EditAttendanceDialog from "../../attendance/components/EditAttendanceDialog";


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

    const {
        data: assignmentsData,
        isLoading: assignmentsLoading,
    } = useProjectAssignments(id);

    const removeAssignmentMutation =
        useRemoveAssignment();

    const {
        data: tasksData,
        isLoading: tasksLoading,
        isError: tasksError,
    } = useProjectTasks(id);

    const {
        data: attendanceData,
        isLoading: attendanceLoading,
        isError: attendanceError,
    } = useProjectAttendance(id);

    const deleteAttendanceMutation =
        useDeleteAttendance();

    const attendance = attendanceData?.data ?? [];

    const assignments = assignmentsData?.data ?? [];
    const tasks = tasksData?.data ?? [];

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="h-8 w-32 animate-pulse rounded bg-[#E2E8E4]" />

                <div className="h-48 animate-pulse rounded-xl border bg-[#E7ECE8]" />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="h-40 animate-pulse rounded-xl border bg-[#E7ECE8]" />
                    <div className="h-40 animate-pulse rounded-xl border bg-[#E7ECE8]" />
                </div>
            </div>
        );
    }

    if (isError || !project) {
        return (
            <Card className="border-[#EAD3D0] bg-[#F4E8E6] shadow-none">
                <CardContent className="p-6">
                    <h2 className="font-semibold text-[#7F403B]">
                        Unable to load project
                    </h2>

                    <p className="mt-1 text-sm text-[#A9605B]">
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
        <div className="space-y-8">
            {/* Back */}
            <Button
                variant="ghost"
                className="-ml-2 text-[#625E57] hover:bg-white/70"
                onClick={() => navigate("/projects")}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
            </Button>

            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D7D9BF] bg-[#E7E9D7] text-[#7E845E] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
                        <FolderKanban className="h-6 w-6 text-[#7E845E]" />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-semibold text-[#191A1C] sm:text-2xl">
                                {project.projectName}
                            </h1>

                            <StatusBadge
                                status={project.status}
                            />
                        </div>

                        <p className="mt-1 text-sm text-[#A49F95]">
                            {project.projectCode}
                        </p>
                    </div>
                </div>

                <EditProjectDialog project={project} />
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
                            ? formatDate(
                                project.estimatedEndDate
                            )
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
                <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.065)]">
                    <CardContent className="p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-[#7E845E]" />

                                <h2 className="text-sm font-semibold text-[#191A1C]">
                                    Project Team
                                </h2>
                            </div>

                            <CreateAssignmentDialog
                                projectId={project._id}
                            />
                        </div>

                        <div className="mt-5 space-y-4">
                            {assignmentsLoading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map(
                                        (item) => (
                                            <div
                                                key={item}
                                                className="h-14 animate-pulse rounded-xl bg-white/70"
                                            />
                                        )
                                    )}
                                </div>
                            ) : assignments.length ===
                                0 ? (
                                <div className="rounded-xl border border-dashed border-[#D5DDD8] px-4 py-8 text-center">
                                    <p className="text-sm font-medium text-[#55524D]">
                                        No employees assigned
                                    </p>

                                    <p className="mt-1 text-xs text-[#A49F95]">
                                        Assign employees to
                                        start building the
                                        project team.
                                    </p>
                                </div>
                            ) : (
                                assignments.map(
                                    (assignment) => (
                                        <div
                                            key={
                                                assignment._id
                                            }
                                            className="flex items-center justify-between gap-3 rounded-xl border border-[#D9E1DC] bg-white/70 p-3.5 transition-colors hover:bg-white"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7E9D7] text-xs font-semibold text-[#7E845E]">
                                                    {
                                                        assignment
                                                            .employee
                                                            ?.firstName?.[0]
                                                    }
                                                    {
                                                        assignment
                                                            .employee
                                                            ?.lastName?.[0]
                                                    }
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium text-[#55524D]">
                                                        {
                                                            assignment
                                                                .employee
                                                                ?.firstName
                                                        }{" "}
                                                        {
                                                            assignment
                                                                .employee
                                                                ?.lastName
                                                        }
                                                    </p>

                                                    <p className="text-xs text-[#A49F95]">
                                                        {
                                                            assignment.assignedRole
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                disabled={
                                                    removeAssignmentMutation.isPending
                                                }
                                                className="shrink-0 text-xs text-[#A9605B] hover:bg-[#F4E8E6] hover:text-[#A9605B]"
                                                onClick={async () => {
                                                    try {
                                                        await removeAssignmentMutation.mutateAsync(
                                                            assignment._id
                                                        );

                                                        toast.success(
                                                            "Employee removed from project."
                                                        );
                                                    } catch (
                                                    error
                                                    ) {
                                                        toast.error(
                                                            error
                                                                ?.response
                                                                ?.data
                                                                ?.message ||
                                                            "Failed to remove assignment."
                                                        );
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Address */}
                <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.065)]">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#7E845E]" />

                            <h2 className="text-sm font-semibold text-[#191A1C]">
                                Project Location
                            </h2>
                        </div>

                        <div className="mt-5 text-sm leading-6 text-[#625E57]">
                            {project.address ? (
                                <>
                                    {project.address.street && (
                                        <p>
                                            {
                                                project
                                                    .address
                                                    .street
                                            }
                                        </p>
                                    )}

                                    <p>
                                        {
                                            project.address
                                                .city
                                        }

                                        {project.address
                                            .state &&
                                            `, ${project.address.state}`}
                                    </p>

                                    <p>
                                        {
                                            project.address
                                                .country
                                        }

                                        {project.address
                                            .zipCode &&
                                            ` - ${project.address.zipCode}`}
                                    </p>
                                </>
                            ) : (
                                <p className="text-[#A49F95]">
                                    No address provided
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tasks */}
            <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.065)]">
                <CardContent className="p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4 text-[#7E845E]" />

                            <div>
                                <h2 className="text-sm font-semibold text-[#191A1C]">
                                    Project Tasks
                                </h2>

                                <p className="mt-0.5 text-xs text-[#A49F95]">
                                    Track work and responsibilities
                                    for this project.
                                </p>
                            </div>
                        </div>

                        <CreateTaskDialog
                            projectId={project._id}
                        />
                    </div>

                    <div className="mt-5">
                        {tasksLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-20 animate-pulse rounded-xl bg-white/70"
                                    />
                                ))}
                            </div>
                        ) : tasksError ? (
                            <div className="rounded-xl border border-[#EAD3D0] bg-[#F4E8E6] px-4 py-6 text-center">
                                <p className="text-sm font-medium text-[#7F403B]">
                                    Unable to load tasks
                                </p>

                                <p className="mt-1 text-xs text-[#A9605B]">
                                    Something went wrong while
                                    fetching project tasks.
                                </p>
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[#D5DDD8] bg-white/50 px-4 py-12 text-center">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E7E9D7]">
                                    <ClipboardList className="h-5 w-5 text-[#7E845E]" />
                                </div>

                                <p className="mt-3 text-sm font-medium text-[#55524D]">
                                    No tasks yet
                                </p>

                                <p className="mt-1 text-xs text-[#A49F95]">
                                    Create the first task for
                                    this project.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {tasks.map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.065)]">
                <CardContent className="p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-4 w-4 text-[#7E845E]" />

                                <h2 className="text-sm font-semibold text-[#191A1C]">
                                    Project Attendance
                                </h2>
                            </div>

                            <p className="mt-1 text-xs text-[#A49F95]">
                                Track employee attendance for this project.
                            </p>
                        </div>

                        <MarkAttendanceDialog
                            projectId={project._id}
                        />
                    </div>

                    <div className="mt-5">
                        {attendanceLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-16 animate-pulse rounded-xl bg-white/70"
                                    />
                                ))}
                            </div>
                        ) : attendanceError ? (
                            <div className="rounded-xl border border-[#EAD3D0] bg-[#F4E8E6] px-4 py-6 text-center">
                                <p className="text-sm font-medium text-[#7F403B]">
                                    Unable to load attendance
                                </p>
                            </div>
                        ) : attendance.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-[#D5DDD8] bg-white/50 px-4 py-12 text-center">
                                <p className="text-sm font-medium text-[#55524D]">
                                    No attendance records
                                </p>

                                <p className="mt-1 text-xs text-[#A49F95]">
                                    Mark attendance for the project team.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {attendance.map((record) => (
                                    <div
                                        key={record._id}
                                        className="rounded-xl border border-[#D9E1DC] bg-white/60 p-4"
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7E9D7] text-xs font-semibold text-[#7E845E]">
                                                    {record.employee?.firstName?.[0]}
                                                    {record.employee?.lastName?.[0]}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-[#292A2C]">
                                                        {record.employee?.firstName}{" "}
                                                        {record.employee?.lastName}
                                                    </p>

                                                    <p className="text-xs text-[#A49F95]">
                                                        {record.employee?.role}
                                                    </p>
                                                </div>
                                            </div>

                                            <AttendanceStatusBadge
                                                status={record.status}
                                            />
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 gap-4 border-t border-[#DCE4DF] pt-3 sm:grid-cols-4">
                                            <div>
                                                <p className="text-xs text-[#A49F95]">
                                                    Date
                                                </p>

                                                <p className="mt-1 text-xs font-medium text-[#55524D]">
                                                    {formatDate(record.date)}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-[#A49F95]">
                                                    Check In
                                                </p>

                                                <p className="mt-1 text-xs font-medium text-[#55524D]">
                                                    {record.checkIn || "—"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-[#A49F95]">
                                                    Check Out
                                                </p>

                                                <p className="mt-1 text-xs font-medium text-[#55524D]">
                                                    {record.checkOut || "—"}
                                                </p>
                                            </div>

                                            <div className="flex items-end justify-end">
                                                <div className="flex items-end justify-end gap-1">
                                                    <EditAttendanceDialog
                                                        attendance={record}
                                                    />

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        disabled={
                                                            deleteAttendanceMutation.isPending
                                                        }
                                                        className="text-xs text-[#A9605B] hover:bg-[#F4E8E6] hover:text-[#A9605B]"
                                                        onClick={async () => {
                                                            try {
                                                                await deleteAttendanceMutation.mutateAsync(
                                                                    record._id
                                                                );

                                                                toast.success(
                                                                    "Attendance deleted successfully."
                                                                );
                                                            } catch (error) {
                                                                toast.error(
                                                                    error?.response?.data?.message ||
                                                                    "Failed to delete attendance."
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {record.remarks && (
                                            <div className="mt-3 rounded-md bg-slate-50 px-3 py-2">
                                                <p className="text-xs text-[#A49F95]">
                                                    Remarks
                                                </p>

                                                <p className="mt-1 text-xs text-[#625E57]">
                                                    {record.remarks}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function TaskCard({ task }) {
    return (
        <div className="rounded-xl border border-[#D9E1DC] bg-white/60 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#191A1C]">
                            {task.title}
                        </h3>

                        <TaskPriorityBadge
                            priority={task.priority}
                        />
                    </div>

                    {task.description && (
                        <p className="mt-1 text-xs leading-5 text-[#77736B]">
                            {task.description}
                        </p>
                    )}
                </div>

                <TaskStatusBadge
                    status={task.status}
                />
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-[#DCE4DF] pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs text-[#A49F95]">
                        Assigned to
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#55524D]">
                        {task.assignedTo
                            ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
                            : "Unassigned"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-[#A49F95]">
                        Due date
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#55524D]">
                        {task.dueDate
                            ? formatDate(task.dueDate)
                            : "No due date"}
                    </p>
                </div>
            </div>
        </div>
    );
}

function TaskStatusBadge({ status }) {
    const styles = {
        TODO: "bg-white/70 text-[#625E57]",
        IN_PROGRESS: "bg-[#E7E9D7] text-[#6F754E]",
        COMPLETED:
            "bg-[#EAF0EB] text-[#55705F]",
        ON_HOLD:
            "bg-[#F5EBD5] text-[#916B1E]",
    };

    const label = status
        ?.toLowerCase()
        .replace("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        );

    return (
        <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[status] ||
                "bg-white/70 text-[#625E57]"
                }`}
        >
            {label || "Unknown"}
        </span>
    );
}

function TaskPriorityBadge({ priority }) {
    const styles = {
        LOW: "bg-white/70 text-[#625E57]",
        MEDIUM: "bg-[#E7E9D7] text-[#6F754E]",
        HIGH: "bg-[#F5EBD5] text-[#916B1E]",
        URGENT: "bg-[#F4E8E6] text-[#A9605B]",
    };

    const label = priority
        ?.toLowerCase()
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        );

    return (
        <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[priority] ||
                "bg-white/70 text-[#625E57]"
                }`}
        >
            {label || "Medium"}
        </span>
    );
}

function AttendanceStatusBadge({ status }) {
    const styles = {
        PRESENT: "bg-[#EAF0EB] text-[#55705F]",
        ABSENT: "bg-[#F4E8E6] text-[#A9605B]",
        HALF_DAY: "bg-[#F5EBD5] text-[#916B1E]",
        LEAVE: "bg-[#E7E9D7] text-[#6F754E]",
    };

    const labels = {
        PRESENT: "Present",
        ABSENT: "Absent",
        HALF_DAY: "Half Day",
        LEAVE: "Leave",
    };

    return (
        <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles[status] || "bg-white/70 text-[#625E57]"
                }`}
        >
            {labels[status] || status}
        </span>
    );
}

function InfoCard({ label, value }) {
    return (
        <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.065)]">
            <CardContent className="p-5">
                <p className="text-xs text-[#A49F95]">
                    {label}
                </p>

                <p className="mt-2 text-sm font-semibold text-[#191A1C]">
                    {value}
                </p>
            </CardContent>
        </Card>
    );
}

function StatusBadge({ status }) {
    const styles = {
        PLANNING:
            "bg-white/70 text-[#625E57]",
        IN_PROGRESS:
            "bg-[#E7E9D7] text-[#6F754E]",
        COMPLETED:
            "bg-[#EAF0EB] text-[#55705F]",
        ON_HOLD:
            "bg-[#F5EBD5] text-[#916B1E]",
        CANCELLED:
            "bg-[#F4E8E6] text-[#A9605B]",
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
                "bg-white/70 text-[#625E57]"
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