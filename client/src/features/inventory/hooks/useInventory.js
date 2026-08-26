import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getInventory,
  createInventory,
  stockIn,
  stockOut,
  getInventoryTransactions,
} from "../services/inventoryService";

export function useInventory(params = {}) {
  return useQuery({
    queryKey: ["inventory", params],
    queryFn: () => getInventory(params),
  });
}

export function useCreateInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-overview"],
      });
    },
  });
}

export function useStockIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      stockIn(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-overview"],
      });

      queryClient.invalidateQueries({
        queryKey: ["inventory-transactions"],
      });
    },
  });
}

export function useStockOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      stockOut(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard-overview"],
      });

      queryClient.invalidateQueries({
        queryKey: ["inventory-transactions"],
      });
    },
  });
}

export function useInventoryTransactions(id) {
  return useQuery({
    queryKey: ["inventory-transactions", id],
    queryFn: () =>
      getInventoryTransactions(id),
    enabled: Boolean(id),
  });
}