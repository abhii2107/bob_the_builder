import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createAttendance,
  getProjectAttendance,
  getEmployeeAttendance,
  updateAttendance,
  deleteAttendance,
} from "../services/attendanceService";

export function useProjectAttendance(projectId) {
  return useQuery({
    queryKey: ["projectAttendance", projectId],
    queryFn: () => getProjectAttendance(projectId),
    enabled: Boolean(projectId),
  });
}

export function useEmployeeAttendance(employeeId) {
  return useQuery({
    queryKey: ["employeeAttendance", employeeId],
    queryFn: () => getEmployeeAttendance(employeeId),
    enabled: Boolean(employeeId),
  });
}

export function useCreateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAttendance,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "projectAttendance",
          variables.project,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "employeeAttendance",
          variables.employee,
        ],
      });
    },
  });
}

export function useUpdateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateAttendance(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectAttendance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["employeeAttendance"],
      });
    },
  });
}

export function useDeleteAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAttendance,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectAttendance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["employeeAttendance"],
      });
    },
  });
}