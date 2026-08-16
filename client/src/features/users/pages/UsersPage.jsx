import { Users, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EmployeeStatusButton from "../components/EmployeeStatusButton";
import EditEmployeeDialog from "../components/EditEmployeeDialog";
import CreateEmployeeDialog from "../components/CreateEmployeeDialog";
import { useUsers } from "../hooks/useUsers";

function UsersPage() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
  } = useUsers();

  const users = data?.data ?? [];

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(query)
    );
  }, [users, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Management
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Employees
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage employees and their roles across your company.
          </p>
        </div>

        <CreateEmployeeDialog />
      </section>

      {/* Search */}
      <Card className="border-slate-200 bg-white shadow-none">
        <CardContent className="p-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              type="search"
              placeholder="Search employees..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <Card className="border-red-200 bg-red-50 shadow-none">
          <CardContent className="p-6">
            <h2 className="font-semibold text-red-900">
              Unable to load employees
            </h2>

            <p className="mt-1 text-sm text-red-700">
              {error?.response?.data?.message ||
                "Something went wrong."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Empty */}
      {!isLoading &&
        !isError &&
        filteredUsers.length === 0 && (
          <Card className="border-slate-200 bg-white shadow-none">
            <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Users className="h-6 w-6 text-blue-600" />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-slate-900">
                No employees found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {search
                  ? "No employees match your search."
                  : "Create your first employee to get started."}
              </p>

              {!search && (
                <div className="mt-4">
                  <CreateEmployeeDialog />
                </div>
              )}
            </CardContent>
          </Card>
        )}

      {/* Employees */}
      {!isLoading &&
        !isError &&
        filteredUsers.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredUsers.map((user) => (
              <Card
                key={user._id}
                className="border-slate-200 bg-white shadow-none transition-shadow duration-200 hover:shadow-sm"
              >
                <CardContent className="p-5">
                  {/* Employee information */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-slate-900">
                        {user.firstName} {user.lastName}
                      </h2>

                      <p className="truncate text-xs text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Role + Edit */}
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          Role
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {user.role}
                        </p>
                      </div>

                      <div
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${user.isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                          }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end gap-2">
                      <EditEmployeeDialog user={user} />

                      <EmployeeStatusButton user={user} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
    </div>
  );
}

export default UsersPage;