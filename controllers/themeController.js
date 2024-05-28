const Theme = require("../models/theme");

async function getUserTheme(ctx) {
  const theme = await Theme.findOne();
  ctx.body = theme;
}

async function setUserTheme(ctx) {
  // console.log(ctx.request.body);
  const { appTheme } = ctx.request.body;
  const existingTheme = await Theme.findOne();
  if (existingTheme) {
    const id = existingTheme._id;
    const updatedTheme = await Theme.findByIdAndUpdate(id, ctx.request.body, { new: true });
    if (updatedTheme) {
      ctx.body = updatedTheme;
    } else {
      ctx.status = 404;
      ctx.body = { message: "To-do not found" };
    }
  } else {
    const newTheme = new Theme({
      appTheme,
    });
    await newTheme.save();
    ctx.status = 200;
    ctx.body = newTheme;
  }
}

module.exports = {
  getUserTheme,
  setUserTheme,
};
