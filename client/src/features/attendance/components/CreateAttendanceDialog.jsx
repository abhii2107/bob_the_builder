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

import { useCreateAttendance } from "../hooks/useAttendance";
import { useProjects } from "../../projects/hooks/useProjects";
import { useUsers } from "../../users/hooks/useUsers";

function CreateAttendanceDialog() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    employee: "",
    project: "",
    date: new Date().toISOString().split("T")[0],
    status: "PRESENT",
    checkIn: "",
    checkOut: "",
    remarks: "",
  });

  const createMutation = useCreateAttendance();

  const {
    data: usersData,
    isLoading: usersLoading,
  } = useUsers();

  const {
    data: projectsData,
    isLoading: projectsLoading,
  } = useProjects();

  const users = usersData?.data ?? [];
  const projects = projectsData?.data ?? [];

  useEffect(() => {
    if (!open) return;

    setForm({
      employee: "",
      project: "",
      date: new Date().toISOString().split("T")[0],
      status: "PRESENT",
      checkIn: "",
      checkOut: "",
      remarks: "",
    });
  }, [open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.employee) {
      toast.error("Please select an employee.");
      return;
    }

    if (!form.project) {
      toast.error("Please select a project.");
      return;
    }

    if (!form.date) {
      toast.error("Please select a date.");
      return;
    }

    try {
      await createMutation.mutateAsync({
        employee: form.employee,
        project: form.project,
        date: form.date,
        status: form.status,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        remarks: form.remarks.trim(),
      });

      toast.success("Attendance marked successfully.");

      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to mark attendance."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Mark Attendance
          </DialogTitle>

          <DialogDescription>
            Record attendance for an employee assigned to a project.
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
                createMutation.isPending ||
                usersLoading
              }
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                {usersLoading
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
          </div>

          {/* Project */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Project
            </label>

            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              disabled={
                createMutation.isPending ||
                projectsLoading
              }
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                {projectsLoading
                  ? "Loading projects..."
                  : "Select project"}
              </option>

              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.projectName}
                  {project.projectCode
                    ? ` — ${project.projectCode}`
                    : ""}
                </option>
              ))}
            </select>
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
              disabled={createMutation.isPending}
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
              disabled={createMutation.isPending}
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

          {/* Check In / Check Out */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Check in
              </label>

              <input
                name="checkIn"
                type="time"
                value={form.checkIn}
                onChange={handleChange}
                disabled={createMutation.isPending}
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
                disabled={createMutation.isPending}
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
              disabled={createMutation.isPending}
              placeholder="Optional remarks..."
              className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={createMutation.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createMutation.isPending
                ? "Marking..."
                : "Mark Attendance"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAttendanceDialog;