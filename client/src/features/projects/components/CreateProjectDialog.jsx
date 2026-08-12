import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createProject } from "../services/projectService";

const projectSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name cannot exceed 100 characters"),

  description: z
    .string()
    .optional(),

  budget: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || !Number.isNaN(Number(value)),
      "Budget must be a valid number"
    ),

  startDate: z
    .string()
    .optional(),

  estimatedEndDate: z
    .string()
    .optional(),
});

function CreateProjectDialog({ onCreated }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      budget: "",
      startDate: "",
      estimatedEndDate: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const payload = {
        projectName: values.projectName,
        description: values.description || undefined,
        budget: values.budget
          ? Number(values.budget)
          : undefined,
        startDate: values.startDate || undefined,
        estimatedEndDate:
          values.estimatedEndDate || undefined,
      };

      await createProject(payload);

      toast.success("Project created successfully");

      reset();
      setOpen(false);

      onCreated?.();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create project"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Create new project
          </DialogTitle>

          <DialogDescription>
            Add the basic details for your construction
            project.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Project name */}
          <div className="space-y-2">
            <Label htmlFor="projectName">
              Project name
            </Label>

            <Input
              id="projectName"
              placeholder="e.g. Metro Station Phase 2"
              {...register("projectName")}
            />

            {errors.projectName && (
              <p className="text-xs text-red-600">
                {errors.projectName.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>

            <Textarea
              id="description"
              placeholder="Briefly describe the project..."
              rows={4}
              {...register("description")}
            />

            {errors.description && (
              <p className="text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">
              Budget
            </Label>

            <Input
              id="budget"
              type="number"
              min="0"
              placeholder="5000000"
              {...register("budget")}
            />

            {errors.budget && (
              <p className="text-xs text-red-600">
                {errors.budget.message}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">
                Start date
              </Label>

              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
              />

              {errors.startDate && (
                <p className="text-xs text-red-600">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedEndDate">
                Estimated end
              </Label>

              <Input
                id="estimatedEndDate"
                type="date"
                {...register("estimatedEndDate")}
              />

              {errors.estimatedEndDate && (
                <p className="text-xs text-red-600">
                  {errors.estimatedEndDate.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting
                ? "Creating..."
                : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectDialog;