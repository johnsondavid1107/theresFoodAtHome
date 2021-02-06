const router = require("express").Router();
const bookRoutes = require("./foods");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
