const Inventory = require("./inventory.model");
const Project = require("../project/project.model");

const ApiError = require("../../utils/ApiError");

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

  const materialCode =
    `MAT-${String(count + 1).padStart(4, "0")}`;

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