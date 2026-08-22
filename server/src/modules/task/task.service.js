const Task = require("./task.model");
const User = require("../user/user.model");
const Project = require("../project/project.model");
const ApiError = require("../../utils/ApiError");

exports.createTask = async (
  data,
  companyId,
  assignedBy
) => {
  const {
    title,
    description,
    project,
    assignedTo,
    priority,
    dueDate,
  } = data;

  // Make sure project belongs to this company
  const projectExists = await Project.findOne({
    _id: project,
    company: companyId,
    status: {
      $nin: ["COMPLETED", "CANCELLED"],
    },
  });

  if (!projectExists) {
    throw new ApiError(404, "Project not found or unavailable");
  }

  // If an employee is assigned, make sure they belong
  // to the same company and are active
  if (assignedTo) {
    const employeeExists = await User.findOne({
      _id: assignedTo,
      company: companyId,
      isActive: true,
    });

    if (!employeeExists) {
      throw new ApiError(
        404,
        "Assigned employee not found or inactive"
      );
    }
  }

  const task = await Task.create({
    title,
    description,
    project,
    company: companyId,
    assignedTo: assignedTo || null,
    assignedBy,
    priority,
    dueDate,
  });

  return Task.findById(task._id)
    .populate(
      "assignedTo",
      "firstName lastName email role"
    )
    .populate(
      "assignedBy",
      "firstName lastName email"
    )
    .populate(
      "project",
      "projectName projectCode status"
    );
};

exports.getProjectTasks = async (
  projectId,
  companyId
) => {
  const projectExists = await Project.findOne({
    _id: projectId,
    company: companyId,
  });

  if (!projectExists) {
    throw new ApiError(404, "Project not found");
  }

  const tasks = await Task.find({
    project: projectId,
    company: companyId,
  })
    .populate(
      "assignedTo",
      "firstName lastName email role"
    )
    .populate(
      "assignedBy",
      "firstName lastName email"
    )
    .sort({ createdAt: -1 });

  return tasks;
};

exports.getTaskById = async (
  taskId,
  companyId
) => {
  const task = await Task.findOne({
    _id: taskId,
    company: companyId,
  })
    .populate(
      "assignedTo",
      "firstName lastName email role"
    )
    .populate(
      "assignedBy",
      "firstName lastName email"
    )
    .populate(
      "project",
      "projectName projectCode status"
    );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};