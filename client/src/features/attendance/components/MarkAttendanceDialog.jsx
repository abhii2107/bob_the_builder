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
import { useProjectAssignments } from "../../assignments/hooks/useAssignments";
import { useCreateAttendance } from "../hooks/useAttendance";

function MarkAttendanceDialog({ projectId }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    date: new Date().toISOString().slice(0, 10),
    status: "PRESENT",
    checkIn: "",
    checkOut: "",
    remarks: "",
  });

  const {
    data: usersData,
    isLoading: usersLoading,
  } = useUsers();

  const {
    data: assignmentsData,
    isLoading: assignmentsLoading,
    isError: assignmentsError,
  } = useProjectAssignments(
    open ? projectId : null
  );

  const createAttendanceMutation =
    useCreateAttendance();

  const users = usersData?.data ?? [];
  const assignments = assignmentsData?.data ?? [];

  // Only employees currently assigned to this project
  const projectEmployees = assignments
    .map((assignment) => assignment.employee)
    .filter(Boolean);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      employee: "",
      date: new Date().toISOString().slice(0, 10),
      status: "PRESENT",
      checkIn: "",
      checkOut: "",
      remarks: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!projectId) {
      toast.error("Project ID is missing.");
      return;
    }

    if (!form.employee) {
      toast.error("Please select an employee.");
      return;
    }

    if (!form.date) {
      toast.error("Please select an attendance date.");
      return;
    }

    try {
      await createAttendanceMutation.mutateAsync({
        employee: form.employee,
        project: projectId,
        date: form.date,
        status: form.status,
        checkIn: form.checkIn || undefined,
        checkOut: form.checkOut || undefined,
        remarks: form.remarks.trim() || undefined,
      });

      toast.success("Attendance marked successfully.");

      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to mark attendance."
      );
    }
  };

  const handleOpenChange = (value) => {
    setOpen(value);

    if (!value) {
      resetForm();
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
          Mark Attendance
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Mark Attendance
          </DialogTitle>

          <DialogDescription>
            Record attendance for an employee assigned to
            this project.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Employee */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Employee
            </label>

            <select
              name="employee"
              value={form.employee}
              onChange={handleChange}
              disabled={
                usersLoading ||
                assignmentsLoading ||
                assignmentsError ||
                createAttendanceMutation.isPending
              }
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                {assignmentsLoading
                  ? "Loading project employees..."
                  : "Select employee"}
              </option>

              {projectEmployees.map((employee) => (
                <option
                  key={employee._id}
                  value={employee._id}
                >
                  {employee.firstName}{" "}
                  {employee.lastName} — {employee.role}
                </option>
              ))}
            </select>

            {assignmentsError && (
              <p className="text-xs text-red-600">
                Unable to load project employees.
              </p>
            )}

            {!assignmentsLoading &&
              !assignmentsError &&
              projectEmployees.length === 0 && (
                <p className="text-xs text-amber-600">
                  No employees are currently assigned to this
                  project.
                </p>
              )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Date
            </label>

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              disabled={
                createAttendanceMutation.isPending
              }
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={
                createAttendanceMutation.isPending
              }
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="PRESENT">
                Present
              </option>

              <option value="ABSENT">
                Absent
              </option>

              <option value="HALF_DAY">
                Half Day
              </option>

              <option value="LEAVE">
                Leave
              </option>
            </select>
          </div>

          {/* Check in / Check out */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Check in
              </label>

              <input
                name="checkIn"
                type="time"
                value={form.checkIn}
                onChange={handleChange}
                disabled={
                  createAttendanceMutation.isPending
                }
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Check out
              </label>

              <input
                name="checkOut"
                type="time"
                value={form.checkOut}
                onChange={handleChange}
                disabled={
                  createAttendanceMutation.isPending
                }
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Remarks
            </label>

            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              rows={3}
              placeholder="Optional remarks..."
              disabled={
                createAttendanceMutation.isPending
              }
              className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={
                createAttendanceMutation.isPending
              }
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                createAttendanceMutation.isPending ||
                assignmentsLoading ||
                projectEmployees.length === 0 ||
                !form.employee
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createAttendanceMutation.isPending
                ? "Saving..."
                : "Mark Attendance"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default MarkAttendanceDialog;