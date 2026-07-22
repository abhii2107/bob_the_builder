const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const companyService = require("./company.service");

exports.getCompanyProfile = asyncHandler(async (req, res) => {
  const company = await companyService.getCompanyProfile(req.user.company);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Company profile fetched successfully",
      company
    )
  );
});

exports.updateCompanyProfile = asyncHandler(async (req, res) => {
  const company = await companyService.updateCompanyProfile(
    req.user.company,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Company updated successfully",
      company
    )
  );
});