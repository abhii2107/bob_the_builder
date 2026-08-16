const Assignment = require("./assignment.model");
const User = require("../user/user.model");
const Project = require("../project/project.model");
const ApiError = require("../../utils/ApiError");

exports.createAssignment = async (
  assignmentData,
  companyId,
  assignedBy
) => {
  const { employee, project } = assignmentData;

  const employeeExists = await User.findOne({
    _id: employee,
    company: companyId,
    isActive: true,
  }).lean();

  if (!employeeExists) {
    throw new ApiError(404, "Employee not found or inactive.");
  }

  const projectExists = await Project.findOne({
    _id: project,
    company: companyId,
    status: {
      $nin: ["COMPLETED", "CANCELLED"],
    },
  }).lean();

  if (!projectExists) {
    throw new ApiError(404, "Project not found.");
  }

  const existingAssignment = await Assignment.findOne({
    employee,
    project,
    isActive: true,
  }).lean();

  if (existingAssignment) {
    throw new ApiError(
      400,
      "Employee is already assigned to this project."
    );
  }

  const assignment = await Assignment.create({
    employee,
    project,
    assignedRole: employeeExists.role,
    company: companyId,
    assignedBy,
  });

  return Assignment.findById(assignment._id)
    .populate("employee", "firstName lastName role")
    .populate("project", "projectName projectCode")
    .populate("assignedBy", "firstName lastName");
};

exports.getProjectAssignments = async (
  projectId,
  companyId
) => {
  const assignments = await Assignment.find({
    project: projectId,
    company: companyId,
    isActive: true,
  })
    .populate(
      "employee",
      "firstName lastName email role profileImage"
    )
    .populate(
      "assignedBy",
      "firstName lastName email"
    )
    .sort({ assignedDate: -1 });

  return assignments;
};

exports.getEmployeeAssignments = async (
  employeeId,
  companyId
) => {
  const assignments = await Assignment.find({
    employee: employeeId,
    company: companyId,
    isActive: true,
  })
    .populate(
      "project",
      "projectName projectCode status"
    )
    .populate(
      "assignedBy",
      "firstName lastName email"
    )
    .sort({ assignedDate: -1 });

  return assignments;
};

exports.removeAssignment = async (
  assignmentId,
  companyId
) => {
  const assignment = await Assignment.findOneAndUpdate(
    {
      _id: assignmentId,
      company: companyId,
      isActive: true,
    },
    {
      isActive: false,
      unassignedDate: new Date(),
    },
    {
      new: true,
    }
  )
    .populate(
      "employee",
      "firstName lastName email role"
    )
    .populate(
      "project",
      "projectName projectCode"
    );

  if (!assignment) {
    throw new ApiError(
      404,
      "Active assignment not found"
    );
  }

  return assignment;
};