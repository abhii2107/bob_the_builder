const assignmentService = require("./assignment.service");

const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

exports.createAssignment = asyncHandler(
  async (req, res) => {

    const assignment =
      await assignmentService.createAssignment(
        req.body,
        req.user.company,
        req.user._id
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Employee assigned successfully",
        assignment
      )
    );

  }
);

exports.getProjectAssignments = asyncHandler(
  async (req, res) => {
    const assignments =
      await assignmentService.getProjectAssignments(
        req.params.projectId,
        req.user.company
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Project assignments fetched successfully",
        assignments
      )
    );
  }
);

exports.getEmployeeAssignments = asyncHandler(
  async (req, res) => {

    const assignments =
      await assignmentService.getEmployeeAssignments(
        req.params.employeeId,
        req.user.company
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Employee assignments fetched successfully",
        assignments
      )
    );

  }
);

exports.removeAssignment = asyncHandler(
  async (req, res) => {

    const assignment =
      await assignmentService.removeAssignment(
        req.params.id,
        req.user.company
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Assignment removed successfully",
        assignment
      )
    );

  }
);