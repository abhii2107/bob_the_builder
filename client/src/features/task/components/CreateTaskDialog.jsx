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
import { useCreateTask } from "../hooks/useTasks";

function CreateTaskDialog({ projectId }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "MEDIUM",
    dueDate: "",
  });

  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUsers();

  const createTaskMutation = useCreateTask();

  const users = data?.data ?? [];

  const activeUsers = users.filter(
    (user) => user.isActive
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      assignedTo: "",
      priority: "MEDIUM",
      dueDate: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error("Task title is required.");
      return;
    }

    if (!projectId) {
      toast.error("Project ID is missing.");
      return;
    }

    try {
      await createTaskMutation.mutateAsync({
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        project: projectId,
        assignedTo: form.assignedTo || undefined,
        priority: form.priority,
        dueDate: form.dueDate || undefined,
      });

      toast.success("Task created successfully.");

      resetForm();
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create task."
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
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Create Task
          </DialogTitle>

          <DialogDescription>
            Create a task and optionally assign it to an
            employee.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Task title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Complete foundation inspection"
              disabled={createTaskMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe what needs to be completed..."
              disabled={createTaskMutation.isPending}
              className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Employee */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Assign to
            </label>

            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              disabled={
                isUsersLoading ||
                isUsersError ||
                createTaskMutation.isPending
              }
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                {isUsersLoading
                  ? "Loading employees..."
                  : "Unassigned"}
              </option>

              {activeUsers.map((user) => (
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

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={createTaskMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          {/* Due date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Due date
            </label>

            <input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              disabled={createTaskMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={createTaskMutation.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                createTaskMutation.isPending ||
                !form.title.trim()
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createTaskMutation.isPending
                ? "Creating..."
                : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTaskDialog;