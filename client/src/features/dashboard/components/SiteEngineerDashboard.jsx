import {
  FolderKanban,
  ClipboardCheck,
  Boxes,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

function SiteEngineerDashboard() {
  return (
    <div className="space-y-8">
      {/* =========================================
          Header
      ========================================== */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B9073]">
            Site Operations
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C] sm:text-[34px]">
            Site Engineer Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736B]">
            Monitor assigned projects, workforce attendance, and material
            availability across your sites.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D5DDD8] bg-white px-3 py-2 shadow-[0_6px_18px_rgba(25,26,28,0.035)]">
          <span className="h-2 w-2 rounded-full bg-[#5D7D68]" />

          <span className="text-xs font-medium text-[#55524D]">
            Site status active
          </span>
        </div>
      </section>

      {/* =========================================
          Primary Metrics
      ========================================== */}
      <section>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Assigned Projects"
            value="—"
            icon={FolderKanban}
            accent
          />

          <DashboardCard
            title="Present Today"
            value="—"
            icon={ClipboardCheck}
          />

          <DashboardCard
            title="Low Stock Items"
            value="—"
            icon={AlertTriangle}
            warning
          />

          <DashboardCard
            title="Inventory Items"
            value="—"
            icon={Boxes}
          />
        </div>
      </section>

      {/* =========================================
          Assigned Projects
      ========================================== */}
      <section>
        <Card className="group rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.07)]">
          <CardContent className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#5F5B54] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
                  <FolderKanban className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A49F95]">
                    Project Control
                  </p>

                  <h2 className="mt-1 text-base font-semibold text-[#191A1C]">
                    Assigned Projects
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-[#77736B]">
                    Projects assigned to you will appear here.
                  </p>
                </div>
              </div>

              <span className="w-fit rounded-full border border-[#D9E1DC] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#625E57]">
                Field view
              </span>
            </div>

            <div className="mt-6 rounded-xl border border-[#D9E1DC] bg-white/70 p-6">
              <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F3EF] text-[#8B9073]">
                  <FolderKanban className="h-4 w-4" />
                </div>

                <p className="mt-3 text-sm font-medium text-[#55524D]">
                  Project information will appear here.
                </p>

                <p className="mt-1 max-w-sm text-xs leading-5 text-[#A49F95]">
                  Assigned project status, timelines, and field activity
                  will be displayed in this workspace.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#D8E0DB] pt-4">
              <span className="text-xs text-[#77736B]">
                Project workspace
              </span>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#252629]">
                View projects
                <ArrowRight className="h-3.5 w-3.5 text-[#C9952E] transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* =========================================
          Site Operations
      ========================================== */}
      <section>
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A49F95]">
            Field Activity
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-[-0.01em] text-[#191A1C]">
            Site Operations
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Attendance */}
          <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#5F5B54] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A49F95]">
                      Workforce
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-[#191A1C]">
                      Today's Attendance
                    </h3>

                    <p className="mt-1 text-sm text-[#77736B]">
                      Monitor the current workforce across your assigned
                      sites.
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-[#D9E1DC] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#625E57]">
                  Today
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <MiniStat
                  label="Present"
                  value="—"
                  positive
                />

                <MiniStat
                  label="Absent"
                  value="—"
                />

                <MiniStat
                  label="Half Day"
                  value="—"
                />

                <MiniStat
                  label="Leave"
                  value="—"
                />
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card className="group rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.07)]">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E7D6B0] bg-[#F5EBD5] text-[#C9952E] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
                    <Boxes className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A49F95]">
                      Materials
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-[#191A1C]">
                      Site Inventory
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-[#77736B]">
                      Monitor materials and stock levels at your sites.
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-[#E5D5AE] bg-[#F5EBD5] px-2.5 py-1 text-[11px] font-semibold text-[#916B1E]">
                  Monitor
                </span>
              </div>

              <div className="mt-6 rounded-xl border border-[#D9E1DC] bg-white/70 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A49F95]">
                      Low stock items
                    </p>

                    <p className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[#191A1C]">
                      —
                    </p>

                    <p className="mt-1 text-xs text-[#77736B]">
                      Materials requiring attention
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F1F3EF] text-[#8B9073]">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#E5E9E6]">
                  <div className="h-full w-1/3 rounded-full bg-[#C9952E]" />
                </div>
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
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   Primary Metric
   ========================================================= */

function DashboardCard({
  title,
  value,
  icon: Icon,
  accent = false,
  warning = false,
}) {
  return (
    <Card className="group relative overflow-hidden rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_10px_28px_rgba(25,26,28,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_16px_34px_rgba(25,26,28,0.065)]">
      <div
        className={
          warning
            ? "absolute inset-x-0 top-0 h-px bg-[#C9952E]"
            : accent
              ? "absolute inset-x-0 top-0 h-px bg-[#8B9073]"
              : "absolute inset-x-0 top-0 h-px bg-[#D8E1DB]"
        }
      />

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#77736B]">
              {title}
            </p>

            <p className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C]">
              {value}
            </p>
          </div>

          <div
            className={
              warning
                ? "flex h-11 w-11 items-center justify-center rounded-xl border border-[#E7D6B0] bg-[#F5EBD5] text-[#C9952E]"
                : accent
                  ? "flex h-11 w-11 items-center justify-center rounded-xl border border-[#D7D9BF] bg-[#E7E9D7] text-[#7E845E]"
                  : "flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#5F5B54] shadow-[0_5px_14px_rgba(25,26,28,0.035)]"
            }
          >
            <Icon className="h-[18px] w-[18px]" />
          </div>
        </div>

        <div className="mt-6 border-t border-[#D8E0DB] pt-3">
          <span className="text-[11px] text-[#A49F95]">
            Current snapshot
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

/* =========================================================
   Attendance Metric
   ========================================================= */

function MiniStat({
  label,
  value,
  positive = false,
}) {
  return (
    <div className="rounded-xl border border-[#D9E1DC] bg-white/70 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-[#77736B]">
          {label}
        </p>

        {positive && (
          <span className="h-2 w-2 rounded-full bg-[#5D7D68]" />
        )}
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#191A1C]">
        {value}
      </p>
    </div>
  );
}

export default SiteEngineerDashboard;