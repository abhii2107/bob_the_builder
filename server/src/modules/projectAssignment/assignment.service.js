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
    isArchived: false,
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