import {
  Boxes,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useInventory } from "../hooks/useInventory";
import { useProjects } from "@/features/projects/hooks/useProjects";

import CreateInventoryDialog from "../components/CreateInventoryDialog";
import StockInDialog from "../components/StockInDialog";
import StockOutDialog from "../components/StockOutDialog";

function InventoryPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useInventory();

  const {
    data: projectsData,
    isLoading: projectsLoading,
  } = useProjects();

  const inventory = data?.data ?? [];
  const projects = projectsData?.data ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B9073]">
            Materials
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em] text-[#191A1C] sm:text-[34px]">
            Inventory
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77736B]">
            Manage materials and monitor stock levels across projects.
          </p>
        </div>

        <CreateInventoryDialog
          projects={projects}
        />
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
                Number(item.currentStock) <=
                Number(item.minimumStock)
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
        <Card className="border-[#EAD3D0] bg-[#F4E8E6] shadow-none">
          <CardContent className="p-6">
            <h2 className="font-semibold text-[#7F403B]">
              Failed to load inventory
            </h2>

            <p className="mt-1 text-sm text-[#A9605B]">
              {error?.response?.data?.message ||
                "Something went wrong while loading inventory."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Projects loading */}
      {projectsLoading && (
        <p className="text-xs text-[#A49F95]">
          Loading projects...
        </p>
      )}

      {/* Inventory Table */}
      <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_8px_22px_rgba(25,26,28,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_14px_30px_rgba(25,26,28,0.055)]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#D5DDD8] bg-[#F0F2EE]">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.11em] text-[#8E8A81]">
                    Material
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.11em] text-[#8E8A81]">
                    Project
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.11em] text-[#8E8A81]">
                    Category
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.11em] text-[#8E8A81]">
                    Stock
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.11em] text-[#8E8A81]">
                    Minimum
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.11em] text-[#8E8A81]">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-[0.11em] text-[#8E8A81]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-[#77736B]"
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
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9E1DC] bg-white text-[#7E845E] shadow-[0_5px_14px_rgba(25,26,28,0.035)]"><Boxes className="h-6 w-6" /></div>

                      <p className="mt-3 text-sm font-medium text-[#55524D]">
                        No materials found
                      </p>

                      <p className="mt-1 text-xs text-[#A49F95]">
                        Add your first material to start tracking inventory.
                      </p>
                    </td>
                  </tr>
                ) : (
                  inventory.map((item) => {
                    const isLowStock =
                      Number(item.currentStock) <=
                      Number(item.minimumStock);

                    return (
                      <tr
                        key={item._id}
                        className="border-b border-[#D9E1DC] last:border-0 transition-colors hover:bg-white/45"
                      >
                        {/* Material */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-[#191A1C]">
                            {item.materialName}
                          </p>

                          <p className="mt-0.5 text-xs text-[#A49F95]">
                            {item.materialCode}
                          </p>
                        </td>

                        {/* Project */}
                        <td className="px-5 py-4">
                          <p className="text-sm text-[#55524D]">
                            {item.project?.projectName || "—"}
                          </p>

                          <p className="mt-0.5 text-xs text-[#A49F95]">
                            {item.project?.projectCode || ""}
                          </p>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4 text-sm text-[#625E57]">
                          {item.category}
                        </td>

                        {/* Current Stock */}
                        <td className="px-5 py-4">
                          <span
                            className={
                              isLowStock
                                ? "font-semibold text-[#A9605B]"
                                : "font-semibold text-[#191A1C]"
                            }
                          >
                            {item.currentStock}
                          </span>

                          <span className="ml-1 text-xs text-[#A49F95]">
                            {item.unit}
                          </span>
                        </td>

                        {/* Minimum Stock */}
                        <td className="px-5 py-4 text-sm text-[#625E57]">
                          {item.minimumStock}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          {isLowStock ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#EAD3D0] bg-[#F4E8E6] px-2.5 py-1 text-[11px] font-semibold text-[#A9605B]">
                              <AlertTriangle className="h-3 w-3" />
                              Low Stock
                            </span>
                          ) : (
                            <span className="rounded-full border border-[#D5E1D8] bg-[#EAF0EB] px-2.5 py-1 text-[11px] font-semibold text-[#55705F]">
                              In Stock
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap justify-end gap-2">
                            {/* Stock In */}
                            <StockInDialog
                              inventory={item}
                            />

                            {/* Stock Out */}
                            <StockOutDialog
                              inventory={item}
                            />
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
    <Card className="rounded-xl border-[#D5DDD8] bg-[#E7ECE8] shadow-[0_8px_22px_rgba(25,26,28,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C3CEC7] hover:shadow-[0_14px_30px_rgba(25,26,28,0.055)]">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#A49F95]">
              {title}
            </p>

            <p className="mt-2 text-2xl font-semibold text-[#191A1C]">
              {value}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D7D9BF] bg-[#E7E9D7] text-[#7E845E] shadow-[0_5px_14px_rgba(25,26,28,0.035)]">
            <Icon className="h-5 w-5 text-[#7E845E]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InventoryPage;