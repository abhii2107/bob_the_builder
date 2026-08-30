const aiService = require("./ai.service");

const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

exports.chat = asyncHandler(
  async (req, res) => {
    const { message } = req.body;

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json(
        new ApiResponse(
          400,
          "Message is required."
        )
      );
    }
    const response =
      await aiService.chat(
        message.trim(),
        req.user.company
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "AI response generated successfully",
        {
          response,
        }
      )
    );
  }
);