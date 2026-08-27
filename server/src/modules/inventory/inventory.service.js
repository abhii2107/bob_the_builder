const mongoose = require("mongoose");

const Inventory = require("./inventory.model");
const Project = require("../project/project.model");
const ApiError = require("../../utils/ApiError");
const InventoryTransaction = require(
  "../inventoryTransaction/inventoryTransaction.model"
);

// ========================================
// Create Inventory
// ========================================
exports.createInventory = async (
  inventoryData,
  companyId,
  userId
) => {
  // Check project
  const project = await Project.findOne({
    _id: inventoryData.project,
    company: companyId,
  }).lean();

  if (!project) {
    throw new ApiError(
      404,
      "Project not found."
    );
  }

  // Check duplicate material
  const existingMaterial =
    await Inventory.findOne({
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

  // Generate next material code
  const lastInventory =
    await Inventory.findOne({
      company: companyId,
      materialCode: /^MAT-\d+$/,
    })
      .sort({ createdAt: -1 })
      .select("materialCode")
      .lean();

  let nextNumber = 1;

  if (lastInventory?.materialCode) {
    const match =
      lastInventory.materialCode.match(
        /^MAT-(\d+)$/
      );

    if (match) {
      nextNumber =
        Number(match[1]) + 1;
    }
  }

  const materialCode = `MAT-${String(
    nextNumber
  ).padStart(4, "0")}`;

  // Create inventory
  const inventory =
    await Inventory.create({
      ...inventoryData,
      materialCode,
      currentStock: 0,
      company: companyId,
      createdBy: userId,
    });

  // Return populated inventory
  return Inventory.findById(
    inventory._id
  )
    .populate(
      "project",
      "projectName projectCode"
    )
    .populate(
      "createdBy",
      "firstName lastName"
    );
};

// ========================================
// Get Company Inventory
// ========================================
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

  const inventory =
    await Inventory.find(query)
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

// ========================================
// Stock In
// ========================================
exports.stockIn = async (
  inventoryId,
  companyId,
  userId,
  data
) => {
  const quantity = Number(
    data.quantity
  );

  if (
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    throw new ApiError(
      400,
      "Stock quantity must be greater than 0."
    );
  }

  const session =
    await mongoose.startSession();

  try {
    session.startTransaction();

    const inventory =
      await Inventory.findOne({
        _id: inventoryId,
        company: companyId,
        isActive: true,
      }).session(session);

    if (!inventory) {
      throw new ApiError(
        404,
        "Material not found."
      );
    }

    const previousStock =
      inventory.currentStock;

    const newStock =
      previousStock + quantity;

    inventory.currentStock =
      newStock;

    await inventory.save({
      session,
    });

    await InventoryTransaction.create(
      [
        {
          inventory: inventory._id,
          project: inventory.project,
          company: companyId,
          transactionType: "STOCK_IN",
          quantity,
          previousStock,
          newStock,
          remarks:
            data.remarks || "",
          performedBy: userId,
        },
      ],
      {
        session,
      }
    );

    await session.commitTransaction();

    return Inventory.findById(
      inventory._id
    ).populate(
      "project",
      "projectName projectCode"
    );
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

// ========================================
// Stock Out
// ========================================
exports.stockOut = async (
  inventoryId,
  companyId,
  userId,
  data
) => {
  const quantity = Number(
    data.quantity
  );

  if (
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    throw new ApiError(
      400,
      "Stock quantity must be greater than 0."
    );
  }

  const session =
    await mongoose.startSession();

  try {
    session.startTransaction();

    const inventory =
      await Inventory.findOne({
        _id: inventoryId,
        company: companyId,
        isActive: true,
      }).session(session);

    if (!inventory) {
      throw new ApiError(
        404,
        "Material not found."
      );
    }

    if (
      inventory.currentStock <
      quantity
    ) {
      throw new ApiError(
        400,
        "Insufficient stock available."
      );
    }

    const previousStock =
      inventory.currentStock;

    const newStock =
      previousStock - quantity;

    inventory.currentStock =
      newStock;

    await inventory.save({
      session,
    });

    await InventoryTransaction.create(
      [
        {
          inventory: inventory._id,
          project: inventory.project,
          company: companyId,
          transactionType: "STOCK_OUT",
          quantity,
          previousStock,
          newStock,
          remarks:
            data.remarks || "",
          performedBy: userId,
        },
      ],
      {
        session,
      }
    );

    await session.commitTransaction();

    return Inventory.findById(
      inventory._id
    ).populate(
      "project",
      "projectName projectCode"
    );
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

// ========================================
// Transaction History
// ========================================
exports.getInventoryTransactions =
  async (
    inventoryId,
    companyId
  ) => {
    const inventory =
      await Inventory.findOne({
        _id: inventoryId,
        company: companyId,
      });

    if (!inventory) {
      throw new ApiError(
        404,
        "Material not found."
      );
    }

    return InventoryTransaction.find({
      inventory: inventoryId,
      company: companyId,
    })
      .populate(
        "performedBy",
        "firstName lastName role"
      )
      .sort({
        createdAt: -1,
      });
  };