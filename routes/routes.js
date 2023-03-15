const {Router} = require("express");
const {inscription, connexion} = require("../controllers/controller");

const router = Router();

router.post("/inscription", inscription);
router.post("/connexion", connexion);

module.exports = router;