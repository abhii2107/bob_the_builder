import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

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

import { useUpdateAttendance } from "../hooks/useAttendance";

function EditAttendanceDialog({ attendance }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    status: attendance?.status || "PRESENT",
    checkIn: attendance?.checkIn || "",
    checkOut: attendance?.checkOut || "",
    remarks: attendance?.remarks || "",
  });

  const updateMutation = useUpdateAttendance();

  useEffect(() => {
    if (!attendance) return;

    setForm({
      status: attendance.status || "PRESENT",
      checkIn: attendance.checkIn || "",
      checkOut: attendance.checkOut || "",
      remarks: attendance.remarks || "",
    });
  }, [attendance]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateMutation.mutateAsync({
        id: attendance._id,
        data: {
          status: form.status,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          remarks: form.remarks.trim(),
        },
      });

      toast.success("Attendance updated successfully.");
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update attendance."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-xs text-slate-600"
        >
          <Pencil className="mr-1 h-3.5 w-3.5" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Edit Attendance
          </DialogTitle>

          <DialogDescription>
            Update attendance details for{" "}
            {attendance?.employee?.firstName}{" "}
            {attendance?.employee?.lastName}.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={updateMutation.isPending}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
              <option value="HALF_DAY">Half Day</option>
              <option value="LEAVE">Leave</option>
            </select>
          </div>

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
                disabled={updateMutation.isPending}
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
                disabled={updateMutation.isPending}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Remarks
            </label>

            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              rows={3}
              disabled={updateMutation.isPending}
              placeholder="Optional remarks..."
              className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={updateMutation.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {updateMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditAttendanceDialog;