import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useUsers } from "../../users/hooks/useUsers";
import { useCreateAssignment } from "../hooks/useAssignments";

function CreateAssignmentDialog({ projectId }) {
  const [open, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [assignedRole, setAssignedRole] = useState("");

  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUsers();

  const createAssignmentMutation = useCreateAssignment();

  const users = data?.data ?? [];

  useEffect(() => {
    if (!employeeId) {
      setAssignedRole("");
      return;
    }

    const employee = users.find(
      (user) => user._id === employeeId
    );

    setAssignedRole(employee?.role || "");
  }, [employeeId, users]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!employeeId) {
      toast.error("Please select an employee.");
      return;
    }

    if (!projectId) {
      toast.error("Project ID is missing.");
      return;
    }

    try {
      await createAssignmentMutation.mutateAsync({
        employee: employeeId,
        project: projectId,
        assignedRole,
      });

      toast.success("Employee assigned successfully.");

      setEmployeeId("");
      setAssignedRole("");
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to assign employee."
      );
    }
  };

  const handleOpenChange = (value) => {
    setOpen(value);

    if (!value) {
      setEmployeeId("");
      setAssignedRole("");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Assign Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Assign Employee
          </DialogTitle>

          <DialogDescription>
            Assign an employee to this project.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Employee
            </label>

            <select
              value={employeeId}
              onChange={(event) =>
                setEmployeeId(event.target.value)
              }
              disabled={
                isUsersLoading ||
                createAssignmentMutation.isPending
              }
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                {isUsersLoading
                  ? "Loading employees..."
                  : "Select employee"}
              </option>

              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.firstName} {user.lastName} —{" "}
                  {user.role}
                </option>
              ))}
            </select>

            {isUsersError && (
              <p className="text-xs text-red-600">
                Unable to load employees.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Assignment Role
            </label>

            <input
              value={assignedRole}
              readOnly
              placeholder="Employee role"
              className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600"
            />

            <p className="text-xs text-slate-400">
              The assignment role is taken from the employee's
              current role.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={
                createAssignmentMutation.isPending
              }
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                createAssignmentMutation.isPending ||
                isUsersLoading ||
                !employeeId
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createAssignmentMutation.isPending
                ? "Assigning..."
                : "Assign Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAssignmentDialog;