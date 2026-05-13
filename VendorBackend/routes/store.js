// Store routes - public, no auth needed
const express = require("express")
const router = express.Router()
const { getStore, getProduct, updateSettings } = require("../controllers/storeController")
const { protect } = require("../middleware/authmiddleware")
const upload = require("../middleware/upload")

// GET /api/store/:slug → full store
router.get("/:slug", getStore)

// GET /api/store/:slug/:productSlug → single product
router.get("/:slug/:productSlug", getProduct)

//PUT /api/store/settings -> update store settings (protected - seller)
router.put("/settings", protect, upload.fields([
    {name: "logo", maxCount: 1},
    {name: "bannerImage", maxCount: 1}
]), updateSettings)

module.exports = router