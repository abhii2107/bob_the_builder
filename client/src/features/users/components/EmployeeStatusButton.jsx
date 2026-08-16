import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

import { useUpdateUserStatus } from "../hooks/useUsers";

function EmployeeStatusButton({ user }) {
  const updateStatusMutation = useUpdateUserStatus();

  const handleStatusChange = async () => {
    const nextStatus = !user.isActive;

    try {
      await updateStatusMutation.mutateAsync({
        id: user._id,
        isActive: nextStatus,
      });

      toast.success(
        nextStatus
          ? "Employee activated successfully."
          : "Employee deactivated successfully."
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update employee status."
      );
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleStatusChange}
      disabled={updateStatusMutation.isPending}
      className={
        user.isActive
          ? "text-red-600 hover:bg-red-50 hover:text-red-700"
          : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
      }
    >
      {updateStatusMutation.isPending
        ? "Updating..."
        : user.isActive
        ? "Deactivate"
        : "Activate"}
    </Button>
  );
}

export default EmployeeStatusButton;