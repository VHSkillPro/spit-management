const express = require("express");
const router = express.Router();
const service = require("./service");
const validate = require("./validate");

router.get("/", service.index);
router.post("/", validate.validateRegister, service.create);

module.exports = router;
