import {
  User,
  Building2,
  ShieldCheck,
  LogOut,
  Sparkles,
  ChevronRight,
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

  const roleLabel = user?.role
    ? user.role
        .split("_")
        .map(
          (word) =>
            word.charAt(0) +
            word.slice(1).toLowerCase()
        )
        .join(" ")
    : "User";

  const companyId =
    typeof user?.company === "object"
      ? user?.company?._id || "—"
      : user?.company || "—";

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B9073]">
          Configuration
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C] sm:text-[34px]">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736B]">
          Manage your account, workspace information, and active
          BuildOps session.
        </p>
      </section>

      {/* Profile */}
      <SettingsSection
        icon={User}
        eyebrow="Account"
        title="Profile"
        description="Your BuildOps account information."
      >
        <div className="grid gap-3 sm:grid-cols-2">
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
            value={roleLabel}
            emphasized
          />
        </div>
      </SettingsSection>

      {/* Company */}
      <SettingsSection
        icon={Building2}
        eyebrow="Workspace"
        title="Company"
        description="Your current BuildOps workspace."
      >
        <div className="rounded-xl border border-[#D9E1DC] bg-white/65 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F1F3EF] text-[#7E845E]">
                <Building2 className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A49F95]">
                  Company ID
                </p>

                <p className="mt-1 truncate font-mono text-xs font-medium text-[#55524D]">
                  {companyId}
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#D5E1D8] bg-[#EAF0EB] px-2.5 py-1 text-[11px] font-semibold text-[#55705F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5D7D68]" />
              Active workspace
            </span>
          </div>
        </div>
      </SettingsSection>

      {/* Security */}
      <SettingsSection
        icon={ShieldCheck}
        eyebrow="Security"
        title="Security"
        description="Manage your current BuildOps session."
      >
        <div className="flex flex-col gap-5 rounded-xl border border-[#D9E1DC] bg-white/65 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F3EE] text-[#625E57]">
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#191A1C]">
                Sign out of this device
              </p>

              <p className="mt-1 max-w-md text-xs leading-5 text-[#77736B]">
                End your current BuildOps session on this device.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full rounded-lg border-[#EAD3D0] bg-white text-[#A9605B] hover:bg-[#F4E8E6] hover:text-[#8F4C47] sm:w-auto"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SettingsSection>

      {/* Application */}
      <Card className="rounded-xl border-[#D5DDD8] bg-[#1C1D1F] text-white shadow-[0_14px_34px_rgba(25,26,28,0.10)]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[#D8C17D]">
                <Sparkles className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  BuildOps AI
                </p>

                <p className="mt-1 text-xs text-white/55">
                  Construction ERP workspace
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/65">
                v1.0.0
              </span>

              <ChevronRight className="h-4 w-4 text-[#C9952E]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_10px_28px_rgba(25,26,28,0.04)] transition-all duration-200 hover:border-[#C3CEC7]">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 border-b border-[#D8E0DB] pb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#5F5B54] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
            <Icon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A49F95]">
              {eyebrow}
            </p>

            <h2 className="mt-1 text-base font-semibold text-[#191A1C]">
              {title}
            </h2>

            <p className="mt-1 text-sm leading-5 text-[#77736B]">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

function SettingField({
  label,
  value,
  emphasized = false,
}) {
  return (
    <div className="rounded-xl border border-[#D9E1DC] bg-white/65 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A49F95]">
        {label}
      </p>

      <p
        className={
          emphasized
            ? "mt-2 text-sm font-semibold text-[#7E845E]"
            : "mt-2 text-sm font-medium text-[#191A1C]"
        }
      >
        {value}
      </p>
    </div>
  );
}

export default SettingsPage;
