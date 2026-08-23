const Attendance = require("./attendance.model");
const User = require("../user/user.model");
const Project = require("../project/project.model");
const Assignment = require("../projectAssignment/assignment.model");
const ApiError = require("../../utils/ApiError");

exports.createAttendance = async (
  data,
  companyId,
  markedBy
) => {
  const {
    employee,
    project,
    date,
    status,
    checkIn,
    checkOut,
    remarks,
  } = data;

  // Check employee
  const employeeExists = await User.findOne({
    _id: employee,
    company: companyId,
    isActive: true,
  }).lean();

  if (!employeeExists) {
    throw new ApiError(
      404,
      "Employee not found or inactive."
    );
  }

  // Check project
  const projectExists = await Project.findOne({
    _id: project,
    company: companyId,
    status: {
      $nin: ["COMPLETED", "CANCELLED"],
    },
  }).lean();

  if (!projectExists) {
    throw new ApiError(
      404,
      "Project not found or unavailable."
    );
  }

  // Check if employee is assigned to project
  const assignment = await Assignment.findOne({
    employee,
    project,
    company: companyId,
    isActive: true,
  }).lean();

  if (!assignment) {
    throw new ApiError(
      400,
      "Employee is not assigned to this project."
    );
  }

  // Prevent duplicate attendance for same employee,
  // project and date
  const existingAttendance =
    await Attendance.findOne({
      employee,
      project,
      company: companyId,
      date: {
        $gte: new Date(`${date}T00:00:00.000`),
        $lte: new Date(`${date}T23:59:59.999`),
      },
    }).lean();

  if (existingAttendance) {
    throw new ApiError(
      400,
      "Attendance has already been marked for this employee."
    );
  }

  const attendance = await Attendance.create({
    employee,
    project,
    company: companyId,
    markedBy,
    date,
    status,
    checkIn: checkIn || "",
    checkOut: checkOut || "",
    remarks: remarks || "",
  });

  return Attendance.findById(attendance._id)
    .populate(
      "employee",
      "firstName lastName email role"
    )
    .populate(
      "project",
      "projectName projectCode"
    )
    .populate(
      "markedBy",
      "firstName lastName"
    );
};

exports.getCompanyAttendance = async (
  companyId,
  filters = {}
) => {
  const {
    employee,
    project,
    status,
    date,
  } = filters;

  const query = {
    company: companyId,
  };

  if (employee) {
    query.employee = employee;
  }

  if (project) {
    query.project = project;
  }

  if (status) {
    query.status = status;
  }

  if (date) {
    const startOfDay = new Date(`${date}T00:00:00.000`);
    const endOfDay = new Date(`${date}T23:59:59.999`);

    query.date = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }

  return Attendance.find(query)
    .populate(
      "employee",
      "firstName lastName email role"
    )
    .populate(
      "project",
      "projectName projectCode"
    )
    .populate(
      "markedBy",
      "firstName lastName"
    )
    .sort({
      date: -1,
      createdAt: -1,
    });
};

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