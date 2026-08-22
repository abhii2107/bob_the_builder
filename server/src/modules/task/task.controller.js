const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const taskService = require("./task.service");

exports.createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(
    req.body,
    req.user.company,
    req.user._id
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      "Task created successfully",
      task
    )
  );
});

exports.getProjectTasks = asyncHandler(
  async (req, res) => {
    const tasks = await taskService.getProjectTasks(
      req.params.projectId,
      req.user.company
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Project tasks fetched successfully",
        tasks
      )
    );
  }
);

exports.getTaskById = asyncHandler(
  async (req, res) => {
    const task = await taskService.getTaskById(
      req.params.id,
      req.user.company
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Task fetched successfully",
        task
      )
    );
  }
);