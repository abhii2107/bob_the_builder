import {
  Boxes,
  Plus,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useInventory } from "../hooks/useInventory";

function InventoryPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useInventory();

  const inventory = data?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Materials
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Inventory
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage materials and monitor stock levels across projects.
          </p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Material
        </Button>
      </section>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total Materials"
          value={inventory.length}
          icon={Boxes}
        />

        <SummaryCard
          title="Low Stock"
          value={
            inventory.filter(
              (item) =>
                item.currentStock <=
                item.minimumStock
            ).length
          }
          icon={AlertTriangle}
        />

        <SummaryCard
          title="Active Materials"
          value={
            inventory.filter(
              (item) => item.isActive
            ).length
          }
          icon={Boxes}
        />
      </div>

      {/* Error */}
      {isError && (
        <Card className="border-red-200 bg-red-50 shadow-none">
          <CardContent className="p-6">
            <h2 className="font-semibold text-red-900">
              Failed to load inventory
            </h2>

            <p className="mt-1 text-sm text-red-700">
              {error?.response?.data?.message ||
                "Something went wrong while loading inventory."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card className="border-slate-200 bg-white shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Material
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Project
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Category
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Stock
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Minimum
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      Loading inventory...
                    </td>
                  </tr>
                ) : inventory.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center"
                    >
                      <Boxes className="mx-auto h-8 w-8 text-slate-300" />

                      <p className="mt-3 text-sm font-medium text-slate-700">
                        No materials found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Add your first material to start tracking inventory.
                      </p>
                    </td>
                  </tr>
                ) : (
                  inventory.map((item) => {
                    const isLowStock =
                      item.currentStock <=
                      item.minimumStock;

                    return (
                      <tr
                        key={item._id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-900">
                            {item.materialName}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {item.materialCode}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-700">
                            {item.project?.projectName ||
                              "—"}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {item.project?.projectCode ||
                              ""}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {item.category}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={
                              isLowStock
                                ? "font-semibold text-red-600"
                                : "font-semibold text-slate-900"
                            }
                          >
                            {item.currentStock}
                          </span>

                          <span className="ml-1 text-xs text-slate-400">
                            {item.unit}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {item.minimumStock}
                        </td>

                        <td className="px-5 py-4">
                          {isLowStock ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                              <AlertTriangle className="h-3 w-3" />
                              Low Stock
                            </span>
                          ) : (
                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                              In Stock
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <ArrowDownToLine className="mr-1 h-3.5 w-3.5" />
                              In
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <ArrowUpFromLine className="mr-1 h-3.5 w-3.5" />
                              Out
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <Card className="border-slate-200 bg-white shadow-none">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">
              {title}
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {value}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InventoryPage;