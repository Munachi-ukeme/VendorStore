// Category routes
const express = require("express")
const router = express.Router()
const { getCategories, addCategory, deleteCategory } = require("../controllers/categoryController")
const { protect } = require("../middleware/auth")
const { checkCategoryLimit } = require("../middleware/planLimits")

// GET /api/categories — get all categories
router.get("/", protect, getCategories)

// POST /api/categories — add category
router.post("/", protect, checkCategoryLimit, addCategory)

// DELETE /api/categories/:id — delete category
router.delete("/:id", protect, deleteCategory)

module.exports = router