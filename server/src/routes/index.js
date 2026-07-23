const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const companyRoutes = require("../modules/company/company.routes"); 
const userRoutes = require("../modules/user/user.routes");
const projectRoutes = require("../modules/project/project.routes");

router.use("/auth", authRoutes);
router.use("/company", companyRoutes);
router.use("/users", userRoutes);

router.use("/projects", projectRoutes);

module.exports = router;
