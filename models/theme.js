const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  appTheme: { type: String, required: true },
});

const Theme = mongoose.model("theme", themeSchema);

module.exports = Theme;
