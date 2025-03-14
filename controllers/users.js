const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const users = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users", error });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
};

const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);

        if (!response.insertedId) {
            return res.status(500).json({ message: "Failed to create user" });
        }

        res.status(201).json({ message: "User created successfully", userId: response.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDatabase().db().collection('users').updateOne({ _id: userId }, { $set: user });

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };