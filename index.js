const Koa = require("koa");
const { koaBody } = require("koa-body");
const cors = require("@koa/cors");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todoRoutes");
// const themeRoutes = require("./routes/themeRoutes");

const app = new Koa();
const PORT = process.env.PORT;
const DB_URI = process.env.MONGO_URL;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(cors());
app.use(koaBody());

// router.get("/", ctx => {
//   ctx.status = 200;
//   ctx.body = { message: "Ok" };
// });

app.use(todoRoutes.routes()); // Use todo routes
app.use(todoRoutes.allowedMethods()); // Handle HTTP method OPTIONS for todo routes
// app.use(themeRoutes.routes()); // Use theme routes
// app.use(themeRoutes.allowedMethods()); // Handle HTTP method
// app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
