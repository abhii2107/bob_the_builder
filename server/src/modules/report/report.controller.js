const reportService = require("./report.service");

const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

// ================================
// Attendance Report
// ================================
exports.getAttendanceReport = asyncHandler(
  async (req, res) => {
    const report =
      await reportService.getAttendanceReport(
        req.user.company,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Attendance report fetched successfully",
        report
      )
    );
  }
);

// ================================
// Inventory Report
// ================================
exports.getInventoryReport = asyncHandler(
  async (req, res) => {
    const report =
      await reportService.getInventoryReport(
        req.user.company,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Inventory report fetched successfully",
        report
      )
    );
  }
);

// ================================
// Inventory Transaction Report
// ================================
exports.getInventoryTransactionReport =
  asyncHandler(async (req, res) => {
    const report =
      await reportService.getInventoryTransactionReport(
        req.user.company,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Inventory transaction report fetched successfully",
        report
      )
    );
  });

// ================================
// Project Report
// ================================
exports.getProjectReport = asyncHandler(
  async (req, res) => {
    const report =
      await reportService.getProjectReport(
        req.user.company,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Project report fetched successfully",
        report
      )
    );
  }
);