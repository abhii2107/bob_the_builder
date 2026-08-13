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

function EditProjectDialog({ project }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    projectName: "",
    description: "",
    budget: "",
    startDate: "",
    estimatedEndDate: "",
    status: "PLANNING",
  });

  const updateProjectMutation = useUpdateProject();

  useEffect(() => {
    if (project) {
      setForm({
        projectName: project.projectName || "",
        description: project.description || "",
        budget: project.budget || "",
        startDate: project.startDate
          ? project.startDate.slice(0, 10)
          : "",
        estimatedEndDate: project.estimatedEndDate
          ? project.estimatedEndDate.slice(0, 10)
          : "",
        status: project.status || "PLANNING",
      });
    }
  }, [project]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
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
          projectName: form.projectName,
          description: form.description,
          budget: Number(form.budget) || 0,
          startDate: form.startDate || undefined,
          estimatedEndDate:
            form.estimatedEndDate || undefined,
          status: form.status,
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

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="text-sm font-medium text-slate-700">
              Budget
            </label>

            <Input
              name="budget"
              type="number"
              value={form.budget}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

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
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
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