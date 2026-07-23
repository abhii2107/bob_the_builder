const Project = require("./project.model");

exports.createProject = async (data, companyId, userId) => {

  const count = await Project.countDocuments({ company: companyId });

  const projectCode = `PRJ-${String(count + 1).padStart(4, "0")}`;

  const project = await Project.create({
    ...data,
    company: companyId,
    createdBy: userId,
    projectCode,
  });

  return project;
};

exports.getAllProjects = async (companyId) => {
  const projects = await Project.find({
    company: companyId,
  })
    .populate("projectManager", "firstName lastName email")
    .populate("siteEngineers", "firstName lastName email")
    .sort({ createdAt: -1 });

  return projects;
};

exports.getProjectById = async (projectId, companyId) => {
  const project = await Project.findOne({
    _id: projectId,
    company: companyId,
  })
    .populate("projectManager", "firstName lastName email")
    .populate("siteEngineers", "firstName lastName email");

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};