const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const { Todo } = require('../models/Todo.js');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const todos = await Todo.getAll();
    res.json(todos);
  } catch (e) {
    next(e);
  }
});
