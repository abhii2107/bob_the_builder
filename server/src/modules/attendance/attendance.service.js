const Attendance = require("./attendance.model");
const ApiError = require("../../utils/ApiError");

exports.getProjectAttendance = async (projectId, companyId) => {
  const attendance = await Attendance.find({
    project: projectId,
    company: companyId,
  })
    .populate("employee", "firstName lastName email role")
    .populate("markedBy", "firstName lastName")
    .sort({ date: -1 });

  return attendance;
};

exports.getEmployeeAttendance = async (
  employeeId,
  companyId
) => {
  const attendance = await Attendance.find({
    employee: employeeId,
    company: companyId,
  })
    .populate("project", "projectName projectCode")
    .sort({ date: -1 });

  return attendance;
};

exports.updateAttendance = async (
  attendanceId,
  companyId,
  updateData
) => {
  const attendance = await Attendance.findOneAndUpdate(
    {
      _id: attendanceId,
      company: companyId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("employee", "firstName lastName")
    .populate("project", "projectName");

  if (!attendance) {
    throw new ApiError(404, "Attendance not found");
  }

  return attendance;
};

exports.deleteAttendance = async (
  attendanceId,
  companyId
) => {
  const attendance = await Attendance.findOneAndDelete({
    _id: attendanceId,
    company: companyId,
  });

  if (!attendance) {
    throw new ApiError(404, "Attendance not found");
  }

  return attendance;
};