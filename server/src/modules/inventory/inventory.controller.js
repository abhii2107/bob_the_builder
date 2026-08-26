const inventoryService = require("./inventory.service");

const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

exports.createInventory = asyncHandler(
  async (req, res) => {
    const inventory =
      await inventoryService.createInventory(
        req.body,
        req.user.company,
        req.user._id
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Material created successfully",
        inventory
      )
    );
  }
);

exports.getInventory = asyncHandler(
  async (req, res) => {
    const inventory =
      await inventoryService.getInventory(
        req.user.company,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Inventory fetched successfully",
        inventory
      )
    );
  }
);

exports.stockIn = asyncHandler(async (req, res) => {
  const inventory =
    await inventoryService.stockIn(
      req.params.id,
      req.user.company,
      req.user._id,
      req.body
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Stock added successfully",
      inventory
    )
  );
});

exports.stockOut = asyncHandler(async (req, res) => {
  const inventory =
    await inventoryService.stockOut(
      req.params.id,
      req.user.company,
      req.user._id,
      req.body
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Stock removed successfully",
      inventory
    )
  );
});

exports.getInventoryTransactions =
  asyncHandler(async (req, res) => {
    const transactions =
      await inventoryService.getInventoryTransactions(
        req.params.id,
        req.user.company
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Inventory transactions fetched successfully",
        transactions
      )
    );
  });