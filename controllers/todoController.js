const Todo = require("../models/todo");

// Create a new to-do
const createTodo = async ctx => {
  const { content } = ctx.request.body;
  const todo = new Todo({
    content,
  });
  await todo.save();
  ctx.status = 201;
  ctx.body = todo;
};

// Get all to-dos
const getAllTodos = async ctx => {
  const todos = await Todo.find();
  ctx.body = todos;
};

// Bulk update (Mark all as done)
const markAllAsDone = async ctx => {
  const { ids, update } = ctx.request.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    ctx.status = 400;
    ctx.body = { error: "Invalid IDs array" };
    return;
  }

  try {
    const result = await Todo.updateMany(
      { _id: { $in: ids } }, // Filter to match documents with the given IDs
      { $set: update } // Update operation
    );

    if (result.nModified === 0) {
      ctx.status = 404;
      ctx.body = { error: "No todos found to update" };
    } else {
      ctx.status = 200;
      ctx.body = { message: "Todos updated successfully", result };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};

const deleteAllResolved = async ctx => {
  const { ids } = ctx.request.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    ctx.status = 400;
    ctx.body = { error: "Invalid IDs array" };
    return;
  }

  try {
    const result = await Todo.deleteMany(
      { _id: { $in: ids } } // Filter to match documents with the given IDs
    );

    if (result.deletedCount === 0) {
      ctx.status = 404;
      ctx.body = { error: "No todos found to delete" };
    } else {
      ctx.status = 200;
      ctx.body = { message: "Todos deleted successfully", result };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};

const updateTodo = async ctx => {
  const { id } = ctx.params;
  const updatedTodo = await Todo.findByIdAndUpdate(id, ctx.request.body, { new: true });
  if (updatedTodo) {
    ctx.body = updatedTodo;
  } else {
    ctx.status = 404;
    ctx.body = { message: "To-do not found" };
  }
};

const deleteTodo = async ctx => {
  const { id } = ctx.params;
  const result = await Todo.findByIdAndDelete(id);
  if (result) {
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { message: "To-do not found" };
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  markAllAsDone,
  deleteAllResolved,
  updateTodo,
  deleteTodo,
};
