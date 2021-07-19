const express = require("express");
const router = express.Router();

const AdminController = require("./../app/controllers/AdminController");

// User Routes
router.get("/healthcheck", (req, res) => {
  res.send({ status: true });
});

//--------------------------------------------------------------------------------------------------
router.post("/admin/login", AdminController.login);

router.post("/admin/aforo/mercadoid", AdminController.mercadoid);

router.post("/red-salud/GenerarLinkPago", AdminController.GenerarLinkPago);

module.exports = router;
