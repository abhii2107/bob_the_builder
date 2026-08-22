import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTask,
  getProjectTasks,
  getTaskById,
} from "../services/taskService";

export function useProjectTasks(projectId) {
  return useQuery({
    queryKey: ["projectTasks", projectId],
    queryFn: () => getProjectTasks(projectId),
    enabled: Boolean(projectId),
  });
}

export function useTask(taskId) {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId),
    enabled: Boolean(taskId),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projectTasks", variables.project],
      });
    },
  });
}