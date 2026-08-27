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
    <div className="space-y-6">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Analytics
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Reports
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor projects, attendance, inventory and stock movements.
        </p>
      </section>

      {/* Overview */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ReportCard
            title="Total Projects"
            value={
              projectLoading
                ? "..."
                : projects.totalProjects ?? 0
            }
            icon={FolderKanban}
            error={projectError}
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
          />
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          Projects
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          />

          <MiniCard
            title="Completed"
            value={projects.completed ?? 0}
          />
        </div>
      </section>

      {/* Attendance */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          Attendance
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniCard
            title="Total Records"
            value={attendance.total ?? 0}
          />

          <MiniCard
            title="Present"
            value={attendance.present ?? 0}
          />

          <MiniCard
            title="Absent"
            value={attendance.absent ?? 0}
          />

          <MiniCard
            title="Leave"
            value={attendance.leave ?? 0}
          />
        </div>
      </section>

      {/* Inventory */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          Inventory
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniCard
            title="Materials"
            value={inventory.totalMaterials ?? 0}
          />

          <MiniCard
            title="Active"
            value={inventory.activeMaterials ?? 0}
          />

          <MiniCard
            title="Low Stock"
            value={inventory.lowStock ?? 0}
          />

          <MiniCard
            title="Transactions"
            value={
              transactions.totalTransactions ?? 0
            }
          />
        </div>
      </section>

      {/* Stock Movement */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          Stock Movement
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
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
          />
        </div>
      </section>

      {/* Report Status */}
      {(attendanceError ||
        inventoryError ||
        transactionError ||
        projectError) && (
        <Card className="border-amber-200 bg-amber-50 shadow-none">
          <CardContent className="flex gap-3 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <p className="text-sm font-semibold text-amber-900">
                Some reports could not be loaded
              </p>

              <p className="mt-1 text-xs text-amber-700">
                Check that the Reports API routes are running
                correctly.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ReportCard({
  title,
  value,
  icon: Icon,
  error,
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
              {error ? "—" : value}
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

function MiniCard({ title, value }) {
  return (
    <Card className="border-slate-200 bg-white shadow-none">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-slate-400">
          {title}
        </p>

        <p className="mt-2 text-xl font-semibold text-slate-900">
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
}) {
  return (
    <Card className="border-slate-200 bg-white shadow-none">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">
              {title}
            </p>

            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {value}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {transactions} transaction
              {transactions === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportsPage;