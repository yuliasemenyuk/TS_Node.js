import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);
  res.status(201).json({ message: "Created todo", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const newText = (req.body as { text: string }).text;

  const todoToUpdateIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoToUpdateIndex < 0) {
    throw new Error("Could not find todo");
  }

  TODOS[todoToUpdateIndex] = new Todo(TODOS[todoToUpdateIndex].id, newText);

  res
    .status(200)
    .json({ message: "Updated", updatedTodo: TODOS[todoToUpdateIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoToDeleteIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoToDeleteIndex < 0) {
    throw new Error("Could not find todo");
  }

  TODOS.splice(todoToDeleteIndex, 1);

  res.status(204).json({ message: "Todo deleted" });
};
