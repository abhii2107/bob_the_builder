const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const projectService = require("./project.service");

exports.createProject = asyncHandler(async (req, res) => {

  const project = await projectService.createProject(
    req.body,
    req.user.company,
    req.user._id
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      "Project created successfully",
      project
    )
  );

});

exports.getAllProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.getAllProjects(
    req.user.company
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Projects fetched successfully",
      projects
    )
  );
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(
    req.params.id,
    req.user.company
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Project fetched successfully",
      project
    )
  );
});