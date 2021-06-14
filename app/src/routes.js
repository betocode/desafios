const { Router } = require("express");
const userController = require("./controllers/userController");

const router = new Router();

// user routes
router.get("/healthcheck", (req, res) =>
  res.status(200).json({ msg: "App is running" })
);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUserById);
router.post("/user", userController.createUser);
router.delete("/user/:id", userController.deleteUserById);

module.exports = router;
