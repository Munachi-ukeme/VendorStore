// Store routes - public, no auth needed
const express = require("express")
const router = express.Router()
const { getStore, getProduct } = require("../controllers/storeController")

// GET /api/store/:slug → full store
router.get("/:slug", getStore)

// GET /api/store/:slug/:productSlug → single product
router.get("/:slug/:productSlug", getProduct)

module.exports = router