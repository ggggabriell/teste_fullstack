const express = require("express");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:uid", usersController.getUserById);
router.post("/new", usersController.createUser);
router.patch("/:uid", usersController.updateUser);
router.delete("/:uid", usersController.deleteUser);

// router.post('/new', usersController.createUser)

module.exports = router;
