const Router = require("koa-router");
const themeController = require("../controllers/themeController");

const router = new Router();

router.get("/theme", themeController.getUserTheme);
router.post("/theme", themeController.setUserTheme);

module.exports = router;
