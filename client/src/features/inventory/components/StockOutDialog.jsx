import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowUpFromLine } from "lucide-react";

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

import { useStockOut } from "../hooks/useInventory";

function StockOutDialog({ inventory }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    quantity: "",
    remarks: "",
  });

  const stockOutMutation = useStockOut();

  useEffect(() => {
    if (!open) {
      setForm({
        quantity: "",
        remarks: "",
      });
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

    const quantity = Number(form.quantity);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      toast.error("Quantity must be greater than 0.");
      return;
    }

    if (quantity > Number(inventory.currentStock)) {
      toast.error(
        `Only ${inventory.currentStock} ${inventory.unit} available.`
      );
      return;
    }

    try {
      await stockOutMutation.mutateAsync({
        id: inventory._id,
        data: {
          quantity,
          remarks: form.remarks.trim(),
        },
      });

      toast.success("Stock removed successfully.");

      setForm({
        quantity: "",
        remarks: "",
      });

      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to remove stock."
      );
    }
  };

  if (!inventory) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={
            !inventory.isActive ||
            Number(inventory.currentStock) <= 0
          }
          className="inline-flex h-8 items-center rounded-md border border-slate-200 px-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowUpFromLine className="mr-1 h-3.5 w-3.5" />
          Out
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Remove Stock
          </DialogTitle>

          <DialogDescription>
            Issue stock from{" "}
            <span className="font-medium text-slate-700">
              {inventory.materialName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        {/* Current Stock */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Available Stock
            </span>

            <span className="font-semibold text-slate-900">
              {inventory.currentStock}{" "}
              <span className="text-xs font-normal text-slate-400">
                {inventory.unit}
              </span>
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Quantity
            </label>

            <div className="relative">
              <input
                name="quantity"
                type="number"
                min="0"
                max={inventory.currentStock}
                step="any"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                disabled={stockOutMutation.isPending}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 pr-16 text-sm outline-none focus:border-blue-500"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                {inventory.unit}
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Maximum available: {inventory.currentStock}{" "}
              {inventory.unit}
            </p>
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
              maxLength={250}
              disabled={stockOutMutation.isPending}
              placeholder="e.g. Issued to construction site..."
              className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />

            <p className="text-right text-xs text-slate-400">
              {form.remarks.length}/250
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={stockOutMutation.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={stockOutMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {stockOutMutation.isPending
                ? "Removing..."
                : "Remove Stock"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default StockOutDialog;