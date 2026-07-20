const User = require("../modules/user/user.model");

const generateTokens = async (user, session = null) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await User.findByIdAndUpdate(
    user._id,
    {
      refreshToken,
    },
    {
      session,
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  generateTokens,
};