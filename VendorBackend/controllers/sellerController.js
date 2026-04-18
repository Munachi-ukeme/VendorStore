const Seller = require("../models/Seller")
const Product = require("../models/Product")
const Category = require("../models/Category")
const bcrypt = require("bcryptjs")


// CHANGE PASSWORD
// PUT /api/seller/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // 1. Find seller
    const seller = await Seller.findById(req.seller._id)

    // 2. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, seller.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" })
    }

    // 3. Hash new password
    const salt = await bcrypt.genSalt(10)
    seller.password = await bcrypt.hash(newPassword, salt)

    // 4. Save
    await seller.save()

    res.json({ message: "Password changed successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

 
// -----------------------------------
// DELETE SELLER ACCOUNT
// DELETE /api/seller/account
// Protected — seller must be logged in
// -----------------------------------
const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body

    // 1. Find seller
    const seller = await Seller.findById(req.seller._id)

    // 2. Confirm password before deleting
    // prevents accidental or unauthorized deletion
    const isMatch = await bcrypt.compare(password, seller.password)
    if (!isMatch) {
      return res.status(400).json({ 
        message: "Incorrect password. Account not deleted." 
      })
    }

    // 3. Delete all seller's products
    await Product.deleteMany({ sellerId: seller._id })

    // 4. Delete all seller's categories
    await Category.deleteMany({ sellerId: seller._id })

    // 5. Delete seller account
    await seller.deleteOne()

    res.json({ 
      message: "Your account and all data have been deleted successfully." 
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { deleteAccount, changePassword }