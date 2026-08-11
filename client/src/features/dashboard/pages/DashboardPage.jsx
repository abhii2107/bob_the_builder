import {
  ArrowUpRight,
  ClipboardCheck,
  FolderKanban,
  Users,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

import { useDashboard } from "../hooks/useDashboard";

import { Card, CardContent } from "@/components/ui/card";

function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useDashboard();

  const overview = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-900">
          Unable to load dashboard
        </h2>

        <p className="mt-1 text-sm text-red-700">
          {error?.response?.data?.message ||
            "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  const totalEmployees = overview?.totalEmployees ?? 0;
  const totalProjects = overview?.totalProjects ?? 0;
  const activeProjects = overview?.activeProjects ?? 0;
  const presentToday = overview?.presentToday ?? 0;
  const lowStockItems = overview?.lowStockItems ?? 0;

  const attendancePercentage =
    totalEmployees > 0
      ? Math.round(
          (presentToday / totalEmployees) * 100
        )
      : 0;

  const projectPercentage =
    totalProjects > 0
      ? Math.round(
          (activeProjects / totalProjects) * 100
        )
      : 0;

  const stats = [
    {
      title: "Active Projects",
      value: activeProjects,
      change: `${totalProjects} total projects`,
      icon: FolderKanban,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Employees",
      value: totalEmployees,
      change: "Active employees",
      icon: Users,
      iconClass: "bg-violet-50 text-violet-600",
    },
    {
      title: "Present Today",
      value: presentToday,
      change: `${attendancePercentage}% attendance`,
      icon: ClipboardCheck,
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems,
      change:
        lowStockItems > 0
          ? "Needs attention"
          : "Stock levels are healthy",
      icon: AlertTriangle,
      iconClass: "bg-amber-50 text-amber-600",
    },
  ];

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
                  Projects
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Current project overview
                </p>
              </div>
            </div>

            <div className="px-5 py-8">
              <div className="flex flex-col items-center justify-center text-center">
                <FolderKanban className="h-8 w-8 text-slate-300" />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  Project details coming next
                </p>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                  Your dashboard API currently provides project
                  counts. We'll connect the recent projects list
                  after integrating the Projects API.
                </p>

                <div className="mt-5 grid w-full max-w-sm grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3 text-left">
                    <p className="text-xs text-slate-400">
                      Total
                    </p>

                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {totalProjects}
                    </p>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-3 text-left">
                    <p className="text-xs text-blue-500">
                      Active
                    </p>

                    <p className="mt-1 text-lg font-semibold text-blue-700">
                      {activeProjects}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
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
                value={`${presentToday} / ${totalEmployees}`}
                percentage={`${attendancePercentage}%`}
              />

              <SummaryItem
                label="Projects active"
                value={`${activeProjects} / ${totalProjects}`}
                percentage={`${projectPercentage}%`}
              />

              <SummaryItem
                label="Stock received"
                value={overview?.todayStockIn ?? 0}
                percentage="Today"
              />

              <SummaryItem
                label="Stock issued"
                value={overview?.todayStockOut ?? 0}
                percentage="Today"
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  percentage,
}) {
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