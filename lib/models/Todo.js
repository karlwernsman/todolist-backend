const pool = require('../utils/pool');

class Todo {
  id;
  userId;
  description;
  complete;

  constructor(row) {
    this.id = row.id;
    (this.userId = row.user_id), (this.description = row.description);
    this.complete = row.complete;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from todos;');
    return rows.map((row) => new Todo(row));
  }
}

module.exports = { Todo };
