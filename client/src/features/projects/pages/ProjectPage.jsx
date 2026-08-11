import {
  CalendarDays,
  FolderKanban,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useProjects } from "../hooks/useProjects";

function ProjectsPage() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
  } = useProjects();

  const projects = data?.data ?? [];

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter((project) => {
      return (
        project.projectName
          ?.toLowerCase()
          .includes(query) ||
        project.projectCode
          ?.toLowerCase()
          .includes(query) ||
        project.status
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [projects, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Management
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track your construction projects.
          </p>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </section>

      {/* Search + count */}
      <Card className="border-slate-200 bg-white shadow-none">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <Input
                type="search"
                placeholder="Search projects..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="h-10 pl-9"
              />
            </div>

            <p className="text-sm text-slate-500">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <Card className="border-red-200 bg-red-50 shadow-none">
          <CardContent className="p-6">
            <h2 className="font-semibold text-red-900">
              Unable to load projects
            </h2>

            <p className="mt-1 text-sm text-red-700">
              {error?.response?.data?.message ||
                "Something went wrong. Please try again."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Empty */}
      {!isLoading &&
        !isError &&
        filteredProjects.length === 0 && (
          <Card className="border-slate-200 bg-white shadow-none">
            <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <FolderKanban className="h-6 w-6 text-blue-600" />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-slate-900">
                {search
                  ? "No projects found"
                  : "No projects yet"}
              </h2>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                {search
                  ? "Try a different project name, code, or status."
                  : "Create your first construction project to get started."}
              </p>

              {!search && (
                <Button className="mt-5 bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Project
                </Button>
              )}
            </CardContent>
          </Card>
        )}

      {/* Projects */}
      {!isLoading &&
        !isError &&
        filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))}
          </div>
        )}
    </div>
  );
}

function ProjectCard({ project }) {
  const status = project.status
    ?.toLowerCase()
    .replace("_", " ");

  const formattedStatus =
    project.status === "IN_PROGRESS"
      ? "In Progress"
      : project.status?.charAt(0) +
        project.status?.slice(1).toLowerCase();

  return (
    <Card className="border-slate-200 bg-white shadow-none transition-shadow duration-200 hover:shadow-sm">
      <CardContent className="p-5">
        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <FolderKanban className="h-5 w-5 text-blue-600" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-slate-900">
                {project.projectName}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {project.projectCode}
              </p>
            </div>
          </div>

          <StatusBadge
            status={status}
            label={formattedStatus}
          />
        </div>

        {/* Description */}
        {project.description && (
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
            {project.description}
          </p>
        )}

        {/* Details */}
        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
          <InfoItem
            icon={Users}
            label="Project Manager"
            value={
              project.projectManager
                ? `${project.projectManager.firstName} ${project.projectManager.lastName}`
                : "Not assigned"
            }
          />

          <InfoItem
            icon={CalendarDays}
            label="Start Date"
            value={
              project.startDate
                ? formatDate(project.startDate)
                : "Not set"
            }
          />
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400">
              Budget
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {formatBudget(project.budget)}
            </p>
          </div>

          <Button
            variant="ghost"
            className="text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Icon className="h-4 w-4 shrink-0 text-slate-400" />

      <div className="min-w-0">
        <p className="text-[11px] text-slate-400">
          {label}
        </p>

        <p className="truncate text-xs font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status, label }) {
  const styles = {
    planning: "bg-slate-100 text-slate-600",
    in_progress: "bg-blue-50 text-blue-700",
    completed: "bg-emerald-50 text-emerald-700",
    on_hold: "bg-amber-50 text-amber-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {label || "Unknown"}
    </span>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatBudget(budget) {
  if (!budget) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(budget);
}

export default ProjectsPage;