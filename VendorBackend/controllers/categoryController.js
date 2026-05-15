const Category = require("../models/Category")

// -----------------------------------
// GET ALL CATEGORIES
// GET /api/categories
// -----------------------------------
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ sellerId: req.seller._id})
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// -----------------------------------
// ADD CATEGORY
// POST /api/categories
// -----------------------------------
const addCategory = async (req, res) => {
  try {
    const { name } = req.body

    // check if category name already exists for this seller
    const existing = await Category.findOne({ sellerId: req.seller._id, name})
    if (existing) {
      return res.status(400).json({ message: "Category already exists" })
    }

    const category = await Category.create({ sellerId: req.seller._id, name})

    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// UPDATE CATEGORY
const updateCategory = async (req, res) =>{
  try{
    const {name} = req.body

    // check if new name is provided
    if(!name){
      return res.status(400).json({message: "Category name is required"})
    }

    // find the category and make sure it belongs to this seller
    const catagory = await Category.findOne({
      _id: req.params.id,
      sellerId: req.seller._id,
    })

    if (!category){
      return res.status(404).json({ message: "Category not found"})
    }

    // check if another category with the same name already exists
    const existing = await Category.findOne({
      sellerId: req.seller._id,
      name,
      _id: { $ne: req.params.id },
    })

    if (existing){
      return res.status(400).json({ message: "Category name already exists"})
    }

    // update the name
    category.name = name
    await category.save()

    res.json(category)
  } catch (error){
    res.status(500).json({ message: error.message })
  }
}

// -----------------------------------
// DELETE CATEGORY
// DELETE /api/categories/:id
// -----------------------------------
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)

    // check if category exists
    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    await category.deleteOne()

    res.json({ message: "Category deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getCategories, addCategory, updateCategory, deleteCategory }