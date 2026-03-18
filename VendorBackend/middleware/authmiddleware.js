const jwt = require("jsonwebtoken")
const Seller = require("../models/Seller")

const protect = async (req, res, next) => {
  try {
    let token

    // 1. Check if token exists in request headers
    if (req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")) {
      
      // 2. Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1]
    }

    // 3. If no token found — block the request
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" })
    }

    // 4. Verify the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 5. Find the seller attached to this token
    // and attach them to the request object
    req.seller = await Seller.findById(decoded.id).select("-password")

    // 6. Move on to the next function (the controller)
    next()

  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" })
  }
}

module.exports = { protect }