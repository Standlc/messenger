const User = require("../models/User");

const router = require("express").Router();

//GET USER
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
