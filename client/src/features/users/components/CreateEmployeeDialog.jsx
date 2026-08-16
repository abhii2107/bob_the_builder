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

import { useCreateUser } from "../hooks/useUsers";

const employeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number"),

  role: z.enum(["PROJECT_MANAGER", "SITE_ENGINEER"]),
});

function CreateEmployeeDialog() {
  const [open, setOpen] = useState(false);

  const createUserMutation = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      role: "SITE_ENGINEER",
    },
  });

  const onSubmit = async (values) => {
    try {
      await createUserMutation.mutateAsync(values);

      toast.success("Employee created successfully");

      reset();
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create employee"
      );
    }
  };

  const handleOpenChange = (value) => {
    setOpen(value);

    if (!value) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Add new employee
          </DialogTitle>

          <DialogDescription>
            Create an employee account and assign their role.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
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
                placeholder="Abhishek"
                {...register("firstName")}
              />

              {errors.firstName && (
                <p className="text-xs text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last name
              </Label>

              <Input
                id="lastName"
                placeholder="Bhatia"
                {...register("lastName")}
              />

              {errors.lastName && (
                <p className="text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="employee@example.com"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone
            </Label>

            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              {...register("phone")}
            />

            {errors.phone && (
              <p className="text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Temporary password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Minimum 8 characters"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">
              Role
            </Label>

            <select
              id="role"
              {...register("role")}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="SITE_ENGINEER">
                Site Engineer
              </option>

              <option value="PROJECT_MANAGER">
                Project Manager
              </option>
            </select>

            {errors.role && (
              <p className="text-xs text-red-600">
                {errors.role.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting || createUserMutation.isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                createUserMutation.isPending
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting || createUserMutation.isPending
                ? "Creating..."
                : "Create Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateEmployeeDialog;