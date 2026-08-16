import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

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

import { useUpdateUser } from "../hooks/useUsers";

function EditEmployeeDialog({ user }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "SITE_ENGINEER",
  });

  const updateUserMutation = useUpdateUser();

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        role: user.role || "SITE_ENGINEER",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.firstName.trim()) {
      toast.error("First name is required.");
      return;
    }

    if (!form.lastName.trim()) {
      toast.error("Last name is required.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      await updateUserMutation.mutateAsync({
        id: user._id,
        data: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phone: form.phone.trim(),
          role: form.role,
        },
      });

      toast.success("Employee updated successfully.");
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update employee."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit employee</DialogTitle>

          <DialogDescription>
            Update the employee's personal information and role.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* First + Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First name
              </Label>

              <Input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last name
              </Label>

              <Input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Email - read only */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              value={user.email || ""}
              disabled
              className="bg-slate-50"
            />

            <p className="text-xs text-slate-400">
              Email cannot be changed here.
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone
            </Label>

            <Input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">
              Role
            </Label>

            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="PROJECT_MANAGER">
                Project Manager
              </option>

              <option value="SITE_ENGINEER">
                Site Engineer
              </option>

              <option value="STORE_MANAGER">
                Store Manager
              </option>

              <option value="ACCOUNTANT">
                Accountant
              </option>

              <option value="WORKER">
                Worker
              </option>

              <option value="CLIENT">
                Client
              </option>
            </select>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={updateUserMutation.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateUserMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {updateUserMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditEmployeeDialog;