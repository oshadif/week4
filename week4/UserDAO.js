// UserDAO.js
const db = require('./db');

class UserDAO {
  async getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  async getUserById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async createUser(user) {
    const { name, email, password } = user;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result.insertId;
  }

  async updateUser(id, user) {
    const { name, email, password } = user;
    await db.query(
      'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
      [name, email, password, id]
    );
  }

  async deleteUser(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = new UserDAO();