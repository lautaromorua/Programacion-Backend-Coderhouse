const express = require("express");
const router = express.Router();
const {getAllP, getByIdP, postProduct, putProduct, deleteByIdP} = require("../controllers/controllerProductos");

router.get("/", getAllP)

router.get("/:id", getByIdP)

router.post("/", postProduct)

router.put("/:id", putProduct)

router.delete("/:id", deleteByIdP)

module.exports = {router};