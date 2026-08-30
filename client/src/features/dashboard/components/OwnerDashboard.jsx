import {
  Users,
  FolderKanban,
  ClipboardCheck,
  Boxes,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useDashboard } from "../hooks/useDashboard";

function OwnerDashboard() {
  const { data, isLoading, isError, error } = useDashboard();
  const overview = data?.data ?? {};

  if (isLoading) {
    return (
      <div className="space-y-8">
        <section>
          <div className="h-3 w-20 animate-pulse rounded-full bg-[#e5e1d8]" />
          <div className="mt-3 h-10 w-72 max-w-full animate-pulse rounded-md bg-[#e5e1d8]" />
          <div className="mt-3 h-4 w-[440px] max-w-full animate-pulse rounded bg-[#ebe8e1]" />
        </section>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[152px] animate-pulse rounded-xl border border-[#ddd9d0] bg-[#f0eee7]"
            />
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-[252px] animate-pulse rounded-xl border border-[#ddd9d0] bg-[#f0eee7]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9952e]">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[#191a1c]">
            Owner Dashboard
          </h1>
        </section>

        <Card className="rounded-xl border-[#ead3d0] bg-[#fdf8f7] shadow-[0_10px_30px_rgba(25,26,28,0.04)]">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f4e8e6]">
                <AlertTriangle className="h-4 w-4 text-[#a9605b]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#7f403b]">
                  Unable to load dashboard
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#a9605b]">
                  {error?.response?.data?.message ||
                    "Something went wrong while loading the dashboard."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const lowStockItems = Number(overview.lowStockItems) || 0;
  const todayStockIn = Number(overview.todayStockIn) || 0;
  const todayStockOut = Number(overview.todayStockOut) || 0;
  const totalEmployees = Number(overview.totalEmployees) || 0;
  const totalProjects = Number(overview.totalProjects) || 0;
  const activeProjects = Number(overview.activeProjects) || 0;
  const presentToday = Number(overview.presentToday) || 0;

  const activeProjectRatio =
    totalProjects > 0
      ? Math.round((activeProjects / totalProjects) * 100)
      : 0;

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9952e]">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em] text-[#191a1c] sm:text-[34px]">
            Owner Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736B]">
            A clear view of company operations, project activity,
            attendance, and material movement.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D5DDD8] bg-white px-3 py-2 shadow-[0_6px_18px_rgba(25,26,28,0.035)]">
          <span className="h-2 w-2 rounded-full bg-[#5D7D68]" />
          <span className="text-xs font-medium text-[#55524D]">
            Operations online
          </span>
        </div>
      </section>

      <section>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total Employees" value={totalEmployees} icon={Users} />
          <MetricCard label="Total Projects" value={totalProjects} icon={FolderKanban} />
          <MetricCard label="Active Projects" value={activeProjects} icon={FolderKanban} accent />
          <MetricCard label="Present Today" value={presentToday} icon={ClipboardCheck} />
        </div>
      </section>

      <section>
        <div className="grid gap-5 sm:grid-cols-3">
          <MiniMetricCard
            label="Low Stock Items"
            value={lowStockItems}
            icon={AlertTriangle}
            warning={lowStockItems > 0}
          />
          <MiniMetricCard label="Stock In Today" value={todayStockIn} icon={ArrowDownToLine} />
          <MiniMetricCard label="Stock Out Today" value={todayStockOut} icon={ArrowUpFromLine} />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A49F95]">
            Operations
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-[-0.01em] text-[#191A1C]">
            Operational Overview
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="group rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.07)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DCE4DF] bg-white shadow-[0_5px_14px_rgba(25,26,28,0.04)]">
                    <Boxes className="h-5 w-5 text-[#5F5B54]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A49F95]">
                      Materials
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-[#191A1C]">
                      Inventory
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-[#77736B]">
                      {lowStockItems > 0
                        ? `${lowStockItems} material${lowStockItems === 1 ? "" : "s"} require attention.`
                        : "All tracked materials are above minimum stock."}
                    </p>
                  </div>
                </div>

                <span
                  className={
                    lowStockItems > 0
                      ? "rounded-full border border-[#E5D5AE] bg-[#F5EBD5] px-2.5 py-1 text-[11px] font-semibold text-[#916B1E]"
                      : "rounded-full border border-[#D5E1D8] bg-[#EAF0EB] px-2.5 py-1 text-[11px] font-semibold text-[#55705F]"
                  }
                >
                  {lowStockItems > 0 ? "Attention" : "Healthy"}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <StatTile label="Stock In" value={todayStockIn} meta="Today" icon={ArrowDownToLine} />
                <StatTile label="Stock Out" value={todayStockOut} meta="Today" icon={ArrowUpFromLine} />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#D8E0DB] pt-4">
                <span className="text-xs text-[#77736B]">
                  Material availability
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#252629]">
                  View inventory
                  <ArrowRight className="h-3.5 w-3.5 text-[#C9952E] transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.07)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DCE4DF] bg-white shadow-[0_5px_14px_rgba(25,26,28,0.04)]">
                    <FolderKanban className="h-5 w-5 text-[#5F5B54]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A49F95]">
                      Portfolio
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-[#191A1C]">
                      Projects
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-[#77736B]">
                      {activeProjects} of {totalProjects} projects are currently active.
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-[#E0DDD5] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#625E57]">
                  {totalProjects === 1 ? "1 project" : `${totalProjects} projects`}
                </span>
              </div>

              <div className="mt-6 rounded-xl border border-[#DCE4DF] bg-white/70 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A49F95]">
                      Active
                    </p>
                    <p className="mt-1 text-3xl font-semibold tracking-[-0.02em] text-[#191A1C]">
                      {activeProjects}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A49F95]">
                      Total
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#55524D]">
                      {totalProjects}
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E1E8E3]">
                  <div
                    className="h-full rounded-full bg-[#C9952E] transition-all duration-500"
                    style={{ width: `${Math.min(activeProjectRatio, 100)}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#77736B]">
                    Active project ratio
                  </span>
                  <span className="text-xs font-semibold text-[#191A1C]">
                    {activeProjectRatio}%
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#D8E0DB] pt-4">
                <span className="text-xs text-[#77736B]">
                  Project portfolio
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#252629]">
                  View projects
                  <ArrowRight className="h-3.5 w-3.5 text-[#C9952E] transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, accent = false }) {
  return (
    <Card className="group relative overflow-hidden rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_10px_28px_rgba(25,26,28,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_16px_34px_rgba(25,26,28,0.065)]">
      <div
        className={`absolute inset-x-0 top-0 h-px ${accent ? "bg-[#C9952E]" : "bg-[#DDE5E0]"}`}
      />

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#77736B]">
              {label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C]">
              {value}
            </p>
          </div>

          <div
            className={
              accent
                ? "flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5D5B0] bg-[#F5EBD5] text-[#C9952E]"
                : "flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#5F5B54] shadow-[0_5px_14px_rgba(25,26,28,0.035)]"
            }
          >
            <Icon className="h-[18px] w-[18px]" />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#D8E0DB] pt-3">
          <span className="text-[11px] text-[#A49F95]">
            Current snapshot
          </span>
          <span
            className={
              accent
                ? "text-[11px] font-semibold text-[#9A741F]"
                : "text-[11px] text-transparent"
            }
          >
            Active
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniMetricCard({ label, value, icon: Icon, warning = false }) {
  return (
    <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_8px_24px_rgba(25,26,28,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7]">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div
            className={
              warning
                ? "flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5D5B0] bg-[#F5EBD5] text-[#C9952E]"
                : "flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9E1DC] bg-white text-[#5F5B54]"
            }
          >
            <Icon className="h-4 w-4" />
          </div>

          <p className="text-sm font-medium text-[#66615A]">
            {label}
          </p>
        </div>

        <p className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[#191A1C]">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function StatTile({ label, value, meta, icon: Icon }) {
  return (
    <div className="rounded-xl border border-[#DCE4DF] bg-white/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-[#77736B]">
          {label}
        </p>
        <Icon className="h-4 w-4 text-[#8B877E]" />
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#191A1C]">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-[#A49F95]">
        {meta}
      </p>
    </div>
  );
}

export default OwnerDashboard;
