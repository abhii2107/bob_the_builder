import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useCreateInventory } from "../hooks/useInventory";

const MATERIAL_CATEGORIES = [
  "CEMENT",
  "STEEL",
  "BRICKS",
  "SAND",
  "AGGREGATE",
  "PIPE",
  "ELECTRICAL",
  "PAINT",
  "WOOD",
  "OTHER",
];

const MATERIAL_UNITS = [
  "BAG",
  "KG",
  "TON",
  "PIECE",
  "TRUCK",
  "LITER",
  "METER",
  "BOX",
];

const initialForm = {
  materialName: "",
  category: "",
  unit: "",
  minimumStock: "",
  project: "",
};

function CreateInventoryDialog({ projects = [] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const createMutation = useCreateInventory();

  useEffect(() => {
    if (!open) {
      setForm(initialForm);
    }
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

    if (!form.materialName.trim()) {
      toast.error("Material name is required.");
      return;
    }

    if (!form.category) {
      toast.error("Please select a material category.");
      return;
    }

    if (!form.unit) {
      toast.error("Please select a material unit.");
      return;
    }

    if (!form.project) {
      toast.error("Please select a project.");
      return;
    }

    const minimumStock = Number(form.minimumStock);

    if (
      form.minimumStock !== "" &&
      (!Number.isFinite(minimumStock) ||
        minimumStock < 0)
    ) {
      toast.error(
        "Minimum stock must be a valid number."
      );
      return;
    }

    try {
      await createMutation.mutateAsync({
        materialName: form.materialName.trim(),
        category: form.category,
        unit: form.unit,
        minimumStock:
          form.minimumStock === ""
            ? 0
            : minimumStock,
        project: form.project,
      });

      toast.success(
        "Material created successfully."
      );

      setForm(initialForm);
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create material."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add Material
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add Material
          </DialogTitle>

          <DialogDescription>
            Add a new material to a project inventory.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Material Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Material Name
            </label>

            <input
              name="materialName"
              value={form.materialName}
              onChange={handleChange}
              placeholder="e.g. Portland Cement"
              disabled={createMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={createMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                Select category
              </option>

              {MATERIAL_CATEGORIES.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category.charAt(0) +
                      category
                        .slice(1)
                        .toLowerCase()}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Unit */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Unit
            </label>

            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              disabled={createMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                Select unit
              </option>

              {MATERIAL_UNITS.map((unit) => (
                <option
                  key={unit}
                  value={unit}
                >
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Stock */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Minimum Stock
            </label>

            <input
              name="minimumStock"
              type="number"
              min="0"
              step="any"
              value={form.minimumStock}
              onChange={handleChange}
              placeholder="0"
              disabled={createMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            />

            <p className="text-xs text-slate-400">
              A low-stock warning will appear when current
              stock reaches this value.
            </p>
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
              disabled={createMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                Select project
              </option>

              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.projectName}
                  {project.projectCode
                    ? ` (${project.projectCode})`
                    : ""}
                </option>
              ))}
            </select>

            {projects.length === 0 && (
              <p className="text-xs text-amber-600">
                No projects available. Create a project
                first.
              </p>
            )}
          </div>

          {/* Footer */}
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
              disabled={
                createMutation.isPending ||
                projects.length === 0
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createMutation.isPending
                ? "Creating..."
                : "Create Material"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateInventoryDialog;