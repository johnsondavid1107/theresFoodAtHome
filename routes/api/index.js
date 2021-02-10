const router = require("express").Router();
const foodRoutes = require("./foods");

// food routes
router.use("/foods", foodRoutes);

module.exports = router;
