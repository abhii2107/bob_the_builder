import {
  BarChart3,
  Boxes,
  ClipboardCheck,
  FolderKanban,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import {
  useAttendanceReport,
  useInventoryReport,
  useInventoryTransactionReport,
  useProjectReport,
} from "../hooks/useReports";

function ReportsPage() {
  const {
    data: attendanceData,
    isLoading: attendanceLoading,
    isError: attendanceError,
  } = useAttendanceReport();

  const {
    data: inventoryData,
    isLoading: inventoryLoading,
    isError: inventoryError,
  } = useInventoryReport();

  const {
    data: transactionData,
    isLoading: transactionLoading,
    isError: transactionError,
  } = useInventoryTransactionReport();

  const {
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
  } = useProjectReport();

  const attendance =
    attendanceData?.data?.summary ?? {};

  const inventory =
    inventoryData?.data?.summary ?? {};

  const transactions =
    transactionData?.data?.summary ?? {};

  const projects =
    projectData?.data?.summary ?? {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B9073]">
            Analytics
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C] sm:text-[34px]">
            Reports
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736B]">
            Monitor projects, attendance, inventory, and stock movements
            from a single operational overview.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D5DDD8] bg-white px-3 py-2 shadow-[0_6px_18px_rgba(25,26,28,0.035)]">
          <BarChart3 className="h-3.5 w-3.5 text-[#7E845E]" />
          <span className="text-xs font-medium text-[#55524D]">
            Company analytics
          </span>
        </div>
      </section>

      {/* Overview */}
      <section>
        <SectionHeading
          eyebrow="Snapshot"
          title="Overview"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ReportCard
            title="Total Projects"
            value={
              projectLoading
                ? "..."
                : projects.totalProjects ?? 0
            }
            icon={FolderKanban}
            error={projectError}
            accent
          />

          <ReportCard
            title="Attendance Records"
            value={
              attendanceLoading
                ? "..."
                : attendance.total ?? 0
            }
            icon={ClipboardCheck}
            error={attendanceError}
          />

          <ReportCard
            title="Total Materials"
            value={
              inventoryLoading
                ? "..."
                : inventory.totalMaterials ?? 0
            }
            icon={Boxes}
            error={inventoryError}
          />

          <ReportCard
            title="Low Stock"
            value={
              inventoryLoading
                ? "..."
                : inventory.lowStock ?? 0
            }
            icon={AlertTriangle}
            error={inventoryError}
            warning={
              !inventoryLoading &&
              Number(inventory.lowStock) > 0
            }
          />
        </div>
      </section>

      {/* Projects */}
      <section>
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MiniCard
            title="Total"
            value={projects.totalProjects ?? 0}
          />
          <MiniCard
            title="Planning"
            value={projects.planning ?? 0}
          />
          <MiniCard
            title="Ongoing"
            value={projects.ongoing ?? 0}
            accent
          />
          <MiniCard
            title="Completed"
            value={projects.completed ?? 0}
            success
          />
        </div>
      </section>

      {/* Attendance */}
      <section>
        <SectionHeading
          eyebrow="Workforce"
          title="Attendance"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MiniCard
            title="Total Records"
            value={attendance.total ?? 0}
          />
          <MiniCard
            title="Present"
            value={attendance.present ?? 0}
            success
          />
          <MiniCard
            title="Absent"
            value={attendance.absent ?? 0}
            danger
          />
          <MiniCard
            title="Leave"
            value={attendance.leave ?? 0}
            warning
          />
        </div>
      </section>

      {/* Inventory */}
      <section>
        <SectionHeading
          eyebrow="Materials"
          title="Inventory"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MiniCard
            title="Materials"
            value={inventory.totalMaterials ?? 0}
          />
          <MiniCard
            title="Active"
            value={inventory.activeMaterials ?? 0}
            success
          />
          <MiniCard
            title="Low Stock"
            value={inventory.lowStock ?? 0}
            warning={
              Number(inventory.lowStock) > 0
            }
          />
          <MiniCard
            title="Transactions"
            value={transactions.totalTransactions ?? 0}
          />
        </div>
      </section>

      {/* Stock Movement */}
      <section>
        <SectionHeading
          eyebrow="Movement"
          title="Stock Movement"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <MovementCard
            title="Stock In"
            value={
              transactions.totalStockInQuantity ?? 0
            }
            transactions={
              transactions.stockIn ?? 0
            }
            icon={ArrowDownToLine}
          />

          <MovementCard
            title="Stock Out"
            value={
              transactions.totalStockOutQuantity ?? 0
            }
            transactions={
              transactions.stockOut ?? 0
            }
            icon={ArrowUpFromLine}
            warning
          />
        </div>
      </section>

      {/* Report Status */}
      {(attendanceError ||
        inventoryError ||
        transactionError ||
        projectError) && (
        <Card className="rounded-xl border-[#E5D5AE] bg-[#F5EBD5] shadow-[0_10px_28px_rgba(25,26,28,0.035)]">
          <CardContent className="flex gap-3 p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/70">
              <AlertTriangle className="h-4 w-4 text-[#C9952E]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#7A5A19]">
                Some reports could not be loaded
              </p>

              <p className="mt-1 text-xs leading-5 text-[#916B1E]">
                Check that the Reports API routes are running correctly.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A49F95]">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-lg font-semibold tracking-[-0.01em] text-[#191A1C]">
        {title}
      </h2>
    </div>
  );
}

function ReportCard({
  title,
  value,
  icon: Icon,
  error,
  accent = false,
  warning = false,
}) {
  return (
    <Card className="group relative overflow-hidden rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_10px_28px_rgba(25,26,28,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_16px_34px_rgba(25,26,28,0.06)]">
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
              {error ? "—" : value}
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
            Report snapshot
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniCard({
  title,
  value,
  accent = false,
  success = false,
  warning = false,
  danger = false,
}) {
  const valueTone = danger
    ? "text-[#A9605B]"
    : accent
      ? "text-[#7E845E]"
      : success
        ? "text-[#55705F]"
        : warning
          ? "text-[#916B1E]"
          : "text-[#191A1C]";

  return (
    <Card className="group rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_8px_22px_rgba(25,26,28,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_14px_30px_rgba(25,26,28,0.055)]">
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#77736B]">
            {title}
          </p>

          <span
            className={
              danger
                ? "h-2 w-2 rounded-full bg-[#A9605B]"
                : warning
                  ? "h-2 w-2 rounded-full bg-[#C9952E]"
                  : success
                    ? "h-2 w-2 rounded-full bg-[#5D7D68]"
                    : accent
                      ? "h-2 w-2 rounded-full bg-[#7E845E]"
                      : "h-1.5 w-1.5 rounded-full bg-[#B7B3AA]"
            }
          />
        </div>

        <p
          className={`mt-4 text-2xl font-semibold tracking-[-0.02em] ${valueTone}`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function MovementCard({
  title,
  value,
  transactions,
  icon: Icon,
  warning = false,
}) {
  return (
    <Card className="group rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_12px_30px_rgba(25,26,28,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_16px_36px_rgba(25,26,28,0.07)]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={
                warning
                  ? "flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5D5AE] bg-[#F5EBD5] text-[#C9952E] shadow-[0_5px_14px_rgba(25,26,28,0.035)]"
                  : "flex h-11 w-11 items-center justify-center rounded-xl border border-[#D7D9BF] bg-[#E7E9D7] text-[#7E845E] shadow-[0_5px_14px_rgba(25,26,28,0.035)]"
              }
            >
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A49F95]">
                Inventory flow
              </p>

              <p className="mt-1 text-base font-semibold text-[#191A1C]">
                {title}
              </p>

              <p className="mt-1 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C]">
                {value}
              </p>

              <p className="mt-1 text-xs text-[#77736B]">
                {transactions} transaction
                {transactions === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <span
            className={
              warning
                ? "rounded-full border border-[#E5D5AE] bg-[#F5EBD5] px-2.5 py-1 text-[11px] font-semibold text-[#916B1E]"
                : "rounded-full border border-[#D7D9BF] bg-[#E7E9D7] px-2.5 py-1 text-[11px] font-semibold text-[#6F754E]"
            }
          >
            {warning ? "Outbound" : "Inbound"}
          </span>
        </div>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#E1E8E3]">
          <div
            className={
              warning
                ? "h-full w-2/3 rounded-full bg-[#C9952E]"
                : "h-full w-2/3 rounded-full bg-[#7E845E]"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportsPage;
