const attendanceService = require("./attendance.service");

const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

exports.getProjectAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.getProjectAttendance(
    req.params.projectId,
    req.user.company
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project attendance fetched successfully",
      attendance
    )
  );
});

exports.getCompanyAttendance = asyncHandler(
  async (req, res) => {
    const attendance =
      await attendanceService.getCompanyAttendance(
        req.user.company,
        req.query
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Company attendance fetched successfully",
        attendance
      )
    );
  }
);

exports.createAttendance = asyncHandler(
  async (req, res) => {
    const attendance =
      await attendanceService.createAttendance(
        req.body,
        req.user.company,
        req.user._id
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        "Attendance marked successfully",
        attendance
      )
    );
  }
);

exports.getEmployeeAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.getEmployeeAttendance(
    req.params.employeeId,
    req.user.company
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Employee attendance fetched successfully",
      attendance
    )
  );
});

exports.updateAttendance = asyncHandler(async (req, res) => {
  const attendance =
    await attendanceService.updateAttendance(
      req.params.id,
      req.user.company,
      req.body
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Attendance updated successfully",
      attendance
    )
  );
});

exports.deleteAttendance = asyncHandler(async (req, res) => {
  await attendanceService.deleteAttendance(
    req.params.id,
    req.user.company
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Attendance deleted successfully"
    )
  );
});