import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createAssignment,
  getProjectAssignments,
  getEmployeeAssignments,
  removeAssignment,
} from "../services/assignmentService";

export function useProjectAssignments(projectId) {
  return useQuery({
    queryKey: ["projectAssignments", projectId],
    queryFn: () => getProjectAssignments(projectId),
    enabled: Boolean(projectId),
  });
}

export function useEmployeeAssignments(employeeId) {
  return useQuery({
    queryKey: ["employeeAssignments", employeeId],
    queryFn: () => getEmployeeAssignments(employeeId),
    enabled: Boolean(employeeId),
  });
}

export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssignment,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectAssignments", variables.project],
      });

      queryClient.invalidateQueries({
        queryKey: ["employeeAssignments", variables.employee],
      });
    },
  });
}

export function useRemoveAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAssignment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectAssignments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["employeeAssignments"],
      });
    },
  });
}