// src/controllers/userController.js
const UserDAO = require('../dao/userDao');

class UserService {
    static async createUser(req, res) {
        try {
            // Input validation
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({
                    error: 'Name and email are required'
                });
            }

            // Business logic (could include more complex operations)
            const userId = await UserDAO.create({ name, email });
            
            // Transform and send response
            res.status(201).json({
                message: 'User created successfully',
                data: {
                    id: userId,
                    name,
                    email
                }
            });
        } catch (error) {
            console.error('Error in createUser:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await UserDAO.findAll();
            res.json({
                data: users
            });
        } catch (error) {
            console.error('Error in getUsers:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserDAO.findById(id);
            
            if (!user) {
                return res.status(404).json({
                    error: 'User not found'
                });
            }

            res.json({
                data: user
            });
        } catch (error) {
            console.error('Error in getUserById:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            });
        }
    }
}

module.exports = UserService;