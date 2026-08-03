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