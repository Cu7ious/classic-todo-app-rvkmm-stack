const Router = require("koa-router");
const todoController = require("../controllers/todoController");

const router = new Router();

router.post("/todos", todoController.createTodo);
router.get("/todos", todoController.getAllTodos);
router.put("/todos/update-all", todoController.markAllAsDone);
// DELETE multiple todos by ids
// Due to delete's limitations of the frontend lib
// PUT is used for bulk deletion
router.put("/todos/delete-all", todoController.deleteAllResolved);
router.put("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
