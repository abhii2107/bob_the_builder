const mongoose = require("mongoose");

const Inventory = require("../inventory/inventory.model");
const InventoryTransaction = require("./inventoryTransaction.model");

const ApiError = require("../../utils/ApiError");

const INVENTORY_TRANSACTION_TYPE = require("../../constants/inventoryTransactionType");

exports.stockIn = async (
  data,
  companyId,
  performedBy
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const inventory = await Inventory.findOne({
      _id: data.inventory,
      company: companyId,
      isActive: true,
    }).session(session);

    if (!inventory) {
      throw new ApiError(
        404,
        "Inventory item not found."
      );
    }

    const previousStock = inventory.currentStock;

    const newStock =
      previousStock + data.quantity;

    inventory.currentStock = newStock;

    await inventory.save({ session });

    const transaction =
      await InventoryTransaction.create(
        [
          {
            inventory: inventory._id,
            project: inventory.project,
            company: companyId,
            transactionType:
              INVENTORY_TRANSACTION_TYPE.STOCK_IN,
            quantity: data.quantity,
            previousStock,
            newStock,
            remarks: data.remarks,
            performedBy,
          },
        ],
        { session }
      );

    await session.commitTransaction();

    return transaction[0];

  } catch (error) {

    await session.abortTransaction();

    throw error;

  } finally {

    session.endSession();

  }
};

exports.stockOut = async (
  data,
  companyId,
  performedBy
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const inventory = await Inventory.findOne({
      _id: data.inventory,
      company: companyId,
      isActive: true,
    }).session(session);

    if (!inventory) {
      throw new ApiError(
        404,
        "Inventory item not found."
      );
    }

    const previousStock = inventory.currentStock;

    // Prevent negative stock
    if (previousStock < data.quantity) {
      throw new ApiError(
        400,
        "Insufficient stock."
      );
    }

    const newStock =
      previousStock - data.quantity;

    inventory.currentStock = newStock;

    await inventory.save({ session });

    const transaction =
      await InventoryTransaction.create(
        [
          {
            inventory: inventory._id,
            project: inventory.project,
            company: companyId,
            transactionType:
              INVENTORY_TRANSACTION_TYPE.STOCK_OUT,
            quantity: data.quantity,
            previousStock,
            newStock,
            remarks: data.remarks,
            performedBy,
          },
        ],
        { session }
      );

    await session.commitTransaction();

    return transaction[0];

  } catch (error) {

    await session.abortTransaction();

    throw error;

  } finally {

    session.endSession();

  }
};