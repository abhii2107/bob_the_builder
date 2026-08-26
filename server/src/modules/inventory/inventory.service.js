const Inventory = require("./inventory.model");
const Project = require("../project/project.model");
const ApiError = require("../../utils/ApiError");
const InventoryTransaction = require("../inventoryTransaction/inventoryTransaction.model");
exports.createInventory = async (
  inventoryData,
  companyId,
  userId
) => {
  // Check project
  const project = await Project.findOne({
    _id: inventoryData.project,
    company: companyId,
    isArchived: false,
  }).lean();

  if (!project) {
    throw new ApiError(
      404,
      "Project not found."
    );
  }

  // Check duplicate material
  const existingMaterial = await Inventory.findOne({
    company: companyId,
    project: inventoryData.project,
    materialName: inventoryData.materialName,
    isActive: true,
  }).lean();

  if (existingMaterial) {
    throw new ApiError(
      400,
      "Material already exists in this project."
    );
  }

  // Generate Material Code
  const count = await Inventory.countDocuments({
    company: companyId,
  });

  const materialCode = `MAT-${String(
    count + 1
  ).padStart(4, "0")}`;

  // Create Inventory
  const inventory = await Inventory.create({
    ...inventoryData,
    materialCode,
    currentStock: 0,
    company: companyId,
    createdBy: userId,
  });

  return inventory;
};

// Get company inventory
exports.getInventory = async (
  companyId,
  filters = {}
) => {
  const {
    project,
    category,
    isActive,
  } = filters;

  const query = {
    company: companyId,
  };

  if (project) {
    query.project = project;
  }

  if (category) {
    query.category = category;
  }

  if (isActive !== undefined) {
    query.isActive = isActive;
  }

  const inventory = await Inventory.find(query)
    .populate(
      "project",
      "projectName projectCode"
    )
    .populate(
      "createdBy",
      "firstName lastName"
    )
    .sort({
      createdAt: -1,
    });

  return inventory;
};

// Stock In
exports.stockIn = async (
  inventoryId,
  companyId,
  userId,
  data
) => {
  const inventory = await Inventory.findOne({
    _id: inventoryId,
    company: companyId,
    isActive: true,
  });

  if (!inventory) {
    throw new ApiError(404, "Material not found.");
  }

  const previousStock = inventory.currentStock;
  const newStock = previousStock + Number(data.quantity);

  inventory.currentStock = newStock;
  await inventory.save();

  await InventoryTransaction.create({
    inventory: inventory._id,
    project: inventory.project,
    company: companyId,
    transactionType: "STOCK_IN",
    quantity: data.quantity,
    previousStock,
    newStock,
    remarks: data.remarks || "",
    performedBy: userId,
  });

  return inventory.populate("project", "projectName projectCode");
};

// Stock Out
exports.stockOut = async (
  inventoryId,
  companyId,
  userId,
  data
) => {
  const inventory = await Inventory.findOne({
    _id: inventoryId,
    company: companyId,
    isActive: true,
  });

  if (!inventory) {
    throw new ApiError(404, "Material not found.");
  }

  if (inventory.currentStock < data.quantity) {
    throw new ApiError(
      400,
      "Insufficient stock available."
    );
  }

  const previousStock = inventory.currentStock;
  const newStock = previousStock - Number(data.quantity);

  inventory.currentStock = newStock;
  await inventory.save();

  await InventoryTransaction.create({
    inventory: inventory._id,
    project: inventory.project,
    company: companyId,
    transactionType: "STOCK_OUT",
    quantity: data.quantity,
    previousStock,
    newStock,
    remarks: data.remarks || "",
    performedBy: userId,
  });

  return inventory.populate("project", "projectName projectCode");
};

// Transaction History
exports.getInventoryTransactions = async (
  inventoryId,
  companyId
) => {
  const inventory = await Inventory.findOne({
    _id: inventoryId,
    company: companyId,
  });

  if (!inventory) {
    throw new ApiError(404, "Material not found.");
  }

  return InventoryTransaction.find({
    inventory: inventoryId,
    company: companyId,
  })
    .populate(
      "performedBy",
      "firstName lastName role"
    )
    .sort({ createdAt: -1 });
};