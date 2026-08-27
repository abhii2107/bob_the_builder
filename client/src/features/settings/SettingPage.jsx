import {
  User,
  Building2,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  useAuthStore,
  logout,
} from "@/store/authStore";

function SettingsPage() {
  const { user } = useAuthStore();

  const handleLogout = () => {
    logout();

    window.location.href = "/login";
  };

  const fullName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    "User";

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Configuration
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account and BuildOps workspace settings.
        </p>
      </section>

      {/* Profile */}
      <Card className="border-slate-200 bg-white shadow-none">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <User className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Profile
              </h2>

              <p className="text-sm text-slate-500">
                Your BuildOps account information.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <SettingField
              label="First Name"
              value={user?.firstName || "—"}
            />

            <SettingField
              label="Last Name"
              value={user?.lastName || "—"}
            />

            <SettingField
              label="Email"
              value={user?.email || "—"}
            />

            <SettingField
              label="Role"
              value={user?.role || "—"}
            />
          </div>
        </CardContent>
      </Card>

      {/* Company */}
      <Card className="border-slate-200 bg-white shadow-none">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Company
              </h2>

              <p className="text-sm text-slate-500">
                Your current BuildOps workspace.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <SettingField
              label="Company ID"
              value={
                typeof user?.company === "object"
                  ? user?.company?._id || "—"
                  : user?.company || "—"
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-slate-200 bg-white shadow-none">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Security
              </h2>

              <p className="text-sm text-slate-500">
                Manage your current session.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Sign out
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Sign out of your BuildOps account on this device.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Application */}
      <Card className="border-slate-200 bg-white shadow-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">
                BuildOps AI
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Construction ERP
              </p>
            </div>

            <span className="text-xs font-medium text-slate-400">
              v1.0.0
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default SettingsPage;