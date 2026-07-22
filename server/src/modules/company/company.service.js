const Company = require("./company.model");
const ApiError = require("../../utils/ApiError");

exports.getCompanyProfile = async (companyId) => {
  const company = await Company.findById(companyId);

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  return company;
};

exports.updateCompanyProfile = async (companyId, data) => {
  const company = await Company.findByIdAndUpdate(
    companyId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  return company;
};