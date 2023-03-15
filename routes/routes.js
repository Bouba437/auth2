const passport = require("passport");
const {Router} = require("express");
const {inscription, connexion} = require("../controllers/controller");

const router = Router();

router.post("/inscription", inscription);
router.post("/connexion", connexion);

router.use(passport.authenticate("jwt", {session: false}))
router.get('/', (req, res) => {
    res.send("Route protégée");
})

module.exports = router;