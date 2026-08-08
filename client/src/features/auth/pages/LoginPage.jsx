import { ShieldCheck } from "lucide-react";

import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      {/* Desktop branding */}
      <section className="hidden flex-1 bg-slate-950 p-10 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              B
            </div>

            <span className="text-lg font-semibold text-white">
              BuildOps
            </span>
          </div>

          <div className="mt-24 max-w-lg">
            <p className="text-sm font-medium text-blue-400">
              Construction management
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white xl:text-5xl">
              Manage your projects from one place.
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-400">
              Track employees, projects, attendance and
              operations through one simple workspace.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <ShieldCheck className="h-4 w-4" />
          Secure workspace
        </div>
      </section>

      {/* Login */}
      <section className="flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:max-w-[520px] lg:px-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              B
            </div>

            <span className="font-semibold text-slate-900">
              BuildOps
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to access your workspace.
            </p>
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            Secure access to your BuildOps workspace.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;