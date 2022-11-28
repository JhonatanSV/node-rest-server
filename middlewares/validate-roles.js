const { response, request } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "There was an error saving the user",
    });
  }

  if (req.user.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "You need an ADMIN_ROLE to do this action",
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "There was an error saving the user",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `You need to have one of the following roles to do this action: ADMIN_ROLE ${roles}`,
      });
    }

    next();
  };
};

module.exports = { isAdminRole, hasRole };
