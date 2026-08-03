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