import {
  Users,
  FolderKanban,
  ClipboardCheck,
  Boxes,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useDashboard } from "../hooks/useDashboard";

function OwnerDashboard() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useDashboard();

  const overview = data?.data ?? {};

  if (isLoading) {
    return (
      <div className="space-y-6">
        <section>
          <p className="text-sm font-medium text-blue-600">
            Overview
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Owner Dashboard
          </h1>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50 shadow-none">
        <CardContent className="p-6">
          <h2 className="font-semibold text-red-900">
            Unable to load dashboard
          </h2>

          <p className="mt-1 text-sm text-red-700">
            {error?.response?.data?.message ||
              "Something went wrong while loading the dashboard."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Overview
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Owner Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your company operations and performance.
        </p>
      </section>

      {/* Main Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Employees"
          value={overview.totalEmployees ?? 0}
          icon={Users}
        />

        <DashboardCard
          title="Total Projects"
          value={overview.totalProjects ?? 0}
          icon={FolderKanban}
        />

        <DashboardCard
          title="Active Projects"
          value={overview.activeProjects ?? 0}
          icon={FolderKanban}
        />

        <DashboardCard
          title="Present Today"
          value={overview.presentToday ?? 0}
          icon={ClipboardCheck}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardCard
          title="Low Stock Items"
          value={overview.lowStockItems ?? 0}
          icon={AlertTriangle}
        />

        <DashboardCard
          title="Stock In Today"
          value={overview.todayStockIn ?? 0}
          icon={ArrowDownToLine}
        />

        <DashboardCard
          title="Stock Out Today"
          value={overview.todayStockOut ?? 0}
          icon={ArrowUpFromLine}
        />
      </div>

      {/* Operational Overview */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-200 bg-white shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Boxes className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Inventory Overview
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {overview.lowStockItems ?? 0} item
                  {overview.lowStockItems === 1 ? "" : "s"} currently
                  at or below minimum stock.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Stock In
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {overview.todayStockIn ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Stock Out
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {overview.todayStockOut ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-none">
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold text-slate-900">
              Project Overview
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  Total Projects
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {overview.totalProjects ?? 0}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs text-slate-400">
                  In Progress
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {overview.activeProjects ?? 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <Card className="border-slate-200 bg-white shadow-none">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">
              {title}
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {value}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OwnerDashboard;