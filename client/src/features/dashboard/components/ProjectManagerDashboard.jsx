import {
  FolderKanban,
  Users,
  ClipboardCheck,
  Boxes,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

function ProjectManagerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Operations
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Project Manager Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor your projects, teams, attendance, and site operations.
        </p>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="My Projects"
          value="—"
          icon={FolderKanban}
        />

        <DashboardCard
          title="Team Members"
          value="—"
          icon={Users}
        />

        <DashboardCard
          title="Present Today"
          value="—"
          icon={ClipboardCheck}
        />

        <DashboardCard
          title="Low Stock"
          value="—"
          icon={AlertTriangle}
        />
      </div>

      {/* Project + Operations */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-200 bg-white shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <FolderKanban className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Project Progress
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your assigned project performance will appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <Boxes className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Site Inventory
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Inventory status for your projects will appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance */}
      <Card className="border-slate-200 bg-white shadow-none">
        <CardContent className="p-6">
          <h2 className="text-sm font-semibold text-slate-900">
            Today's Team Attendance
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat
              label="Present"
              value="—"
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

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default ProjectManagerDashboard;