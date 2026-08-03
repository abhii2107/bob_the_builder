const inventoryTransactionService =
require("./inventoryTransaction.service");

const asyncHandler =
require("../../utils/asyncHandler");

const ApiResponse =
require("../../utils/ApiResponse");

exports.stockIn = asyncHandler(
  async (req, res) => {

    const transaction =
      await inventoryTransactionService.stockIn(
        req.body,
        req.user.company,
        req.user._id
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Stock added successfully",
        transaction
      )
    );

  }
);

exports.stockOut = asyncHandler(
  async (req, res) => {

    const transaction =
      await inventoryTransactionService.stockOut(
        req.body,
        req.user.company,
        req.user._id
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Stock removed successfully",
        transaction
      )
    );

  }
);

exports.getInventoryTransactions =
asyncHandler(async (req, res) => {

  const transactions =
    await inventoryTransactionService.getInventoryTransactions(
      req.params.inventoryId,
      req.user.company
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Inventory transaction history fetched successfully",
      transactions
    )
  );

});

exports.getProjectTransactions =
asyncHandler(async (req, res) => {

  const transactions =
    await inventoryTransactionService.getProjectTransactions(
      req.params.projectId,
      req.user.company
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project transactions fetched successfully",
      transactions
    )
  );

});