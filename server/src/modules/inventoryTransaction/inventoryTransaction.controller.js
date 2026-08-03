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