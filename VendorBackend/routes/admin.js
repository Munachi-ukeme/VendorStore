// Admin routes - protected by admin secret key
const express = require("express")
const router = express.Router()
const {
  upgradePlan,
  activateStore,
  deactivateStore,
  activateAll,
  deactivateAll,
  deleteSeller,
  getAllSellers,
  resetPassword,
  markCommissionPaid,
  getAllReferrals,
} = require("../controllers/adminController")

// PUT /api/admin/upgrade → upgrade seller plan
router.put("/upgrade", upgradePlan)

// PUT /api/admin/activate → activate one store
router.put("/activate", activateStore)

// PUT /api/admin/deactivate → deactivate one store
router.put("/deactivate", deactivateStore)

// PUT /api/admin/activate-all → activate all stores
router.put("/activate-all", activateAll)

// PUT /api/admin/deactivate-all → deactivate all stores
router.put("/deactivate-all", deactivateAll)

// DELETE /api/admin/delete-seller → delete seller account + all data
router.delete("/delete-seller", deleteSeller)

// GET /api/admin/get- all all sellers
router.get("/sellers", getAllSellers)

// reset seller password
router.put("/reset-password", resetPassword)

//mark commission as paid
router.put("/mark-commission-paid", markCommissionPaid)

// get all referrals
router.get("/referrals", getAllReferrals)


module.exports = router