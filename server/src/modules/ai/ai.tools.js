const Inventory = require("../inventory/inventory.model");

const getLowStockInventory = async (companyId) => {
  const inventory = await Inventory.find({
    company: companyId,
    isActive: true,
  })
    .populate(
      "project",
      "projectName projectCode"
    )
    .select(
      "materialName materialCode category unit currentStock minimumStock project"
    )
    .sort({
      currentStock: 1,
    })
    .lean();

  return inventory
    .filter(
      (item) =>
        Number(item.currentStock) <=
        Number(item.minimumStock)
    )
    .map((item) => ({
      materialName: item.materialName,
      materialCode: item.materialCode,
      category: item.category,
      unit: item.unit,
      currentStock: item.currentStock,
      minimumStock: item.minimumStock,
      project: item.project
        ? {
            projectName:
              item.project.projectName,
            projectCode:
              item.project.projectCode,
          }
        : null,
    }));
};

module.exports = {
  getLowStockInventory,
};