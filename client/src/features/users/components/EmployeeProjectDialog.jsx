import { useState } from "react";
import { Briefcase, Eye } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useEmployeeAssignments } from "../../assignments/hooks/useAssignments";

function EmployeeProjectsDialog({ user }) {
  const [open, setOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useEmployeeAssignments(
    open ? user?._id : null
  );

  const assignments = data?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          Projects
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {user.firstName} {user.lastName}
          </DialogTitle>

          <DialogDescription>
            Current projects assigned to this employee.
          </DialogDescription>
        </DialogHeader>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-lg border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-900">
              Unable to load projects
            </p>

            <p className="mt-1 text-xs text-red-700">
              Something went wrong while fetching assignments.
            </p>
          </div>
        )}

        {/* No projects */}
        {!isLoading &&
          !isError &&
          assignments.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-900">
                No active projects
              </p>

              <p className="mt-1 text-xs text-slate-500">
                This employee is not currently assigned to
                any project.
              </p>
            </div>
          )}

        {/* Projects */}
        {!isLoading &&
          !isError &&
          assignments.length > 0 && (
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {assignment.project?.projectName ||
                          "Unnamed project"}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {assignment.project?.projectCode ||
                          "No project code"}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      {assignment.project?.status ||
                        "Unknown"}
                    </span>
                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <p className="text-xs text-slate-400">
                      Assigned
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-700">
                      {assignment.assignedDate
                        ? new Date(
                            assignment.assignedDate
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeProjectsDialog;