import { ShieldCheck, ArrowRight } from "lucide-react";

import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F7F6F2] lg:grid lg:grid-cols-[minmax(0,1fr)_500px]">
      {/* =====================================================
          Desktop Brand Panel
      ====================================================== */}
      <section className="relative hidden overflow-hidden bg-[#1C1D1F] p-10 lg:flex lg:min-h-screen lg:flex-col lg:justify-between xl:p-14">
        {/* Decorative architectural lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full border border-white/[0.06]" />
          <div className="absolute -right-10 top-38 h-48 w-48 rounded-full border border-white/[0.05]" />

          <div className="absolute bottom-20 left-10 h-px w-64 bg-white/[0.08]" />
          <div className="absolute bottom-28 left-10 h-px w-40 bg-[#C9952E]/40" />
        </div>

        {/* Brand */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F5EBD5] text-sm font-bold text-[#1C1D1F]">
              B
            </div>

            <div className="leading-tight">
              <span className="block text-lg font-semibold tracking-tight text-white">
                BuildOps
              </span>

              <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                Construction ERP
              </span>
            </div>
          </div>

          {/* Main brand message */}
          <div className="mt-28 max-w-xl xl:mt-36">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#C9952E]" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D8C17D]">
                Construction management
              </p>
            </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.035em] text-white xl:text-[52px] xl:leading-[1.05]">
              Manage every project from one place.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/55">
              Coordinate teams, projects, attendance, inventory, and
              daily site operations through one focused workspace.
            </p>

            {/* Product principles */}
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-3">
              <Feature label="Projects" />
              <Feature label="Workforce" />
              <Feature label="Inventory" />
              <Feature label="BuildOps AI" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]">
            <ShieldCheck className="h-4 w-4 text-white/60" />
          </div>

          <div>
            <p className="text-xs font-medium text-white/70">
              Secure workspace
            </p>

            <p className="mt-0.5 text-[11px] text-white/35">
              Protected access to your company data
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          Login Panel
      ====================================================== */}
      <section className="flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:min-h-screen lg:px-12">
        <div className="w-full max-w-sm">
          {/* Mobile Brand */}
          <div className="mb-14 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1C1D1F] text-sm font-bold text-white">
              B
            </div>

            <div className="leading-tight">
              <span className="block font-semibold tracking-tight text-[#191A1C]">
                BuildOps
              </span>

              <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.14em] text-[#A49F95]">
                Construction ERP
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B9073]">
              Workspace access
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#191A1C]">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#77736B]">
              Sign in to access your BuildOps workspace.
            </p>
          </div>

          {/* Form container */}
          <div className="rounded-xl border border-[#DCD9D1] bg-white p-5 shadow-[0_18px_45px_rgba(25,26,28,0.055)] sm:p-6">
            <LoginForm />
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5D7D68]" />

            <p className="text-[11px] leading-5 text-[#8E8A81]">
              Secure access to your BuildOps workspace.
            </p>
          </div>

          {/* Subtle product note */}
          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#B0ACA3]">
            <span>BuildOps</span>
            <span className="h-1 w-1 rounded-full bg-[#C9952E]" />
            <span>Construction ERP</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ label }) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2.5">
      <span className="h-1.5 w-1.5 rounded-full bg-[#C9952E]" />

      <span className="text-xs font-medium text-white/60">
        {label}
      </span>
    </div>
  );
}

export default LoginPage;