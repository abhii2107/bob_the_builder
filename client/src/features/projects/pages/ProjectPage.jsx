import {
  CalendarDays,
  FolderKanban,
  Plus,
  Search,
  Users,
  ArrowRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useProjects } from "../hooks/useProjects";
import CreateProjectDialog from "../components/CreateProjectDialog";

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
        project.projectName?.toLowerCase().includes(query) ||
        project.projectCode?.toLowerCase().includes(query) ||
        project.status?.toLowerCase().includes(query)
      );
    });
  }, [projects, search]);

  const handleCreated = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B9073]">
            Management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C] sm:text-[34px]">
            Projects
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736B]">
            Manage project portfolios, teams, timelines, budgets, and
            operational status from one workspace.
          </p>
        </div>

        <CreateProjectDialog onCreated={handleCreated} />
      </section>

      {/* Search toolbar */}
      <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_8px_24px_rgba(25,26,28,0.035)]">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-[420px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8E8A81]" />

              <Input
                type="search"
                placeholder="Search projects, codes, or status..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="h-10 rounded-lg border-[#D7DED9] bg-white/85 pl-10 text-sm text-[#191A1C] shadow-none placeholder:text-[#A49F95] focus:border-[#C9952E] focus:ring-2 focus:ring-[#F5EBD5]"
              />
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A49F95]">
                  Visible projects
                </p>

                <p className="mt-0.5 text-sm font-semibold text-[#191A1C]">
                  {filteredProjects.length}
                </p>
              </div>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-xs font-semibold text-[#625E57] transition-colors hover:text-[#C9952E]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[300px] animate-pulse rounded-xl border border-[#D5DDD8] bg-[#E7ECE8]"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <Card className="rounded-xl border-[#EAD3D0] bg-[#FDF8F7] shadow-[0_10px_30px_rgba(25,26,28,0.04)]">
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold text-[#7F403B]">
              Unable to load projects
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#A9605B]">
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
          <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)]">
            <CardContent className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#7E845E] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
                <FolderKanban className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-base font-semibold text-[#191A1C]">
                {search
                  ? "No projects found"
                  : "No projects yet"}
              </h2>

              <p className="mt-1 max-w-sm text-sm leading-6 text-[#77736B]">
                {search
                  ? "Try a different project name, code, or status."
                  : "Create your first construction project to start managing your portfolio."}
              </p>

              {!search && (
                <div className="mt-6">
                  <CreateProjectDialog
                    onCreated={handleCreated}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

      {/* Project cards */}
      {!isLoading &&
        !isError &&
        filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
  const navigate = useNavigate();

  const status =
    project.status
      ?.toLowerCase()
      .replace("_", " ");

  const formattedStatus =
    project.status === "IN_PROGRESS"
      ? "In Progress"
      : project.status
        ? project.status.charAt(0) +
          project.status.slice(1).toLowerCase()
        : "Unknown";

  return (
    <Card className="group relative overflow-hidden rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_18px_40px_rgba(25,26,28,0.075)]">
      {/* subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-[#D8E1DB] transition-colors duration-200 group-hover:bg-[#C9952E]" />

      <CardContent className="p-6">
        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#5F5B54] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
              <FolderKanban className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[#A49F95]">
                Project
              </p>

              <h2 className="mt-1 truncate text-base font-semibold tracking-[-0.01em] text-[#191A1C]">
                {project.projectName}
              </h2>

              <p className="mt-1 text-xs font-medium text-[#8B877E]">
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
          <p className="mt-5 line-clamp-2 text-sm leading-6 text-[#77736B]">
            {project.description}
          </p>
        )}

        {/* Details */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#D8E0DB] pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A49F95]">
              Budget
            </p>

            <p className="mt-1 text-base font-semibold tracking-[-0.01em] text-[#191A1C]">
              {formatBudget(project.budget)}
            </p>
          </div>

          <Button
            variant="ghost"
            className="group/button rounded-lg px-3 text-sm font-semibold text-[#252629] hover:bg-white/70 hover:text-[#191A1C]"
            onClick={() =>
              navigate(`/projects/${project._id}`)
            }
          >
            View details

            <ArrowRight className="ml-1.5 h-4 w-4 text-[#C9952E] transition-transform duration-200 group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-[#D9E1DC] bg-white/60 p-3.5">
      <div className="flex items-start gap-2.5">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#8B877E]" />

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A49F95]">
            {label}
          </p>

          <p className="mt-1 truncate text-xs font-semibold text-[#55524D]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, label }) {
  const styles = {
    planning:
      "border-[#DADDD5] bg-[#F0F1EC] text-[#6F7556]",
    in_progress:
      "border-[#D7D9BF] bg-[#E7E9D7] text-[#6F754E]",
    completed:
      "border-[#D5E1D8] bg-[#EAF0EB] text-[#55705F]",
    on_hold:
      "border-[#E5D5AE] bg-[#F5EBD5] text-[#916B1E]",
    cancelled:
      "border-[#EAD3D0] bg-[#F4E8E6] text-[#A9605B]",
  };

  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
        styles[status] ||
        "border-[#D9E1DC] bg-white text-[#625E57]"
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
