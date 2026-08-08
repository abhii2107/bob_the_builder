import {
  ArrowUpRight,
  ClipboardCheck,
  FolderKanban,
  Users,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2 this month",
    icon: FolderKanban,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Employees",
    value: "54",
    change: "+6 this month",
    icon: Users,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    title: "Present Today",
    value: "47",
    change: "87% attendance",
    icon: ClipboardCheck,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Low Stock Items",
    value: "6",
    change: "Needs attention",
    icon: AlertTriangle,
    iconClass: "bg-amber-50 text-amber-600",
  },
];

const projects = [
  {
    name: "Metro Station Phase 2",
    code: "PRJ-0001",
    status: "Planning",
    progress: 18,
  },
  {
    name: "Highway Expansion",
    code: "PRJ-0002",
    status: "In Progress",
    progress: 64,
  },
  {
    name: "Residential Complex",
    code: "PRJ-0003",
    status: "In Progress",
    progress: 42,
  },
];

function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Overview
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Here's what's happening across your construction
            projects today.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="h-4 w-4" />

          <span>Today</span>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="border-slate-200 bg-white shadow-none transition-shadow duration-200 hover:shadow-sm"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-slate-300" />
                </div>

                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Lower Dashboard */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Projects */}
        <Card className="border-slate-200 bg-white shadow-none xl:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent Projects
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Current project progress
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {projects.map((project) => (
                <div
                  key={project.code}
                  className="px-5 py-4 transition-colors hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {project.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {project.code}
                      </p>
                    </div>

                    <span
                      className={[
                        "w-fit rounded-full px-2.5 py-1 text-[11px] font-medium",
                        project.status === "Planning"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-blue-50 text-blue-700",
                      ].join(" ")}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="mb-1.5 flex justify-between text-[11px]">
                      <span className="text-slate-400">
                        Progress
                      </span>

                      <span className="font-medium text-slate-600">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Summary */}
        <Card className="border-slate-200 bg-white shadow-none">
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold text-slate-900">
              Today's Summary
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Quick overview of today's activity
            </p>

            <div className="mt-5 space-y-4">
              <SummaryItem
                label="Employees present"
                value="47 / 54"
                percentage="87%"
              />

              <SummaryItem
                label="Projects active"
                value="8 / 12"
                percentage="67%"
              />

              <SummaryItem
                label="Pending approvals"
                value="4"
                percentage="Action"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SummaryItem({ label, value, percentage }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500">
          {label}
        </span>

        <span className="text-xs font-medium text-slate-700">
          {percentage}
        </span>
      </div>

      <p className="mt-1 text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default DashboardPage;