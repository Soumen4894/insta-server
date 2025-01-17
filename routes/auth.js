const express = require("express");
const router = express.Router();
const {register, login, findUser} = require("../controllers/auth")



router.post("/register", register)
router.post("/login", login)
router.get("/", findUser)

module.exports = router;