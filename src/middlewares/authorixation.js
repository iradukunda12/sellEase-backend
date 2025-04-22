export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userType)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have access to this resource" });
    }
    next();
  };
};
