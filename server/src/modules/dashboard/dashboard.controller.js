const dashboardService = require("./dashboard.service");

const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

exports.getOverview = asyncHandler(
  async (req, res) => {

    const overview =
      await dashboardService.getOverview(
        req.user.company
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Dashboard fetched successfully",
        overview
      )
    );

  }
);