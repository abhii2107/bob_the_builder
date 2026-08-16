import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useUpdateProject } from "../hooks/useProjects";
import { useUsers } from "@/features/users/hooks/useUsers";

function EditProjectDialog({ project }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    projectName: "",
    description: "",
    budget: "",
    startDate: "",
    estimatedEndDate: "",
    status: "PLANNING",
    projectManager: "",
    siteEngineers: [],
  });

  const updateProjectMutation = useUpdateProject();

  const {
    data: usersData,
    isLoading: usersLoading,
  } = useUsers();

  const users = usersData?.data ?? [];

  const projectManagers = users.filter(
    (user) => user.role === "PROJECT_MANAGER"
  );

  const availableSiteEngineers = users.filter(
    (user) => user.role === "SITE_ENGINEER"
  );

  useEffect(() => {
    if (!project) return;

    setForm({
      projectName: project.projectName || "",
      description: project.description || "",
      budget: project.budget ?? "",
      startDate: project.startDate
        ? project.startDate.slice(0, 10)
        : "",
      estimatedEndDate: project.estimatedEndDate
        ? project.estimatedEndDate.slice(0, 10)
        : "",
      status: project.status || "PLANNING",

      projectManager:
        project.projectManager?._id ||
        project.projectManager ||
        "",

      siteEngineers:
        project.siteEngineers?.map(
          (engineer) => engineer._id || engineer
        ) || [],
    });
  }, [project]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEngineerChange = (event) => {
    const selectedEngineers = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setForm((previous) => ({
      ...previous,
      siteEngineers: selectedEngineers,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.projectName.trim()) {
      toast.error("Project name is required.");
      return;
    }

    try {
      await updateProjectMutation.mutateAsync({
        id: project._id,

        data: {
          projectName: form.projectName.trim(),
          description: form.description,
          budget: Number(form.budget) || 0,
          startDate: form.startDate || undefined,
          estimatedEndDate:
            form.estimatedEndDate || undefined,
          status: form.status,

          projectManager:
            form.projectManager || null,

          siteEngineers: form.siteEngineers,
        },
      });

      toast.success("Project updated successfully.");
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update project."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Project
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Project Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Project Name
            </label>

            <Input
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Budget
            </label>

            <Input
              name="budget"
              type="number"
              min="0"
              value={form.budget}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Start Date
              </label>

              <Input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Estimated End Date
              </label>

              <Input
                name="estimatedEndDate"
                type="date"
                value={form.estimatedEndDate}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          {/* Project Manager */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Project Manager
            </label>

            <select
              name="projectManager"
              value={form.projectManager}
              onChange={handleChange}
              disabled={usersLoading}
              className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="">
                {usersLoading
                  ? "Loading employees..."
                  : "Select project manager"}
              </option>

              {projectManagers.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Site Engineers */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Site Engineers
            </label>

            <select
              multiple
              value={form.siteEngineers}
              onChange={handleEngineerChange}
              disabled={usersLoading}
              className="mt-1 min-h-28 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {availableSiteEngineers.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>

            <p className="mt-1 text-xs text-slate-400">
              Hold Ctrl on Windows or Command on Mac to
              select multiple engineers.
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="PLANNING">Planning</option>
              <option value="IN_PROGRESS">
                In Progress
              </option>
              <option value="COMPLETED">
                Completed
              </option>
              <option value="ON_HOLD">
                On Hold
              </option>
              <option value="CANCELLED">
                Cancelled
              </option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={updateProjectMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateProjectMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {updateProjectMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProjectDialog;