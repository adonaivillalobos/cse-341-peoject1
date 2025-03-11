const mongodb = require('../data/database.js');
const { ObjectId } = require('mongodb');  // Corrected import

const getALL = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }).catch((error) => {
        res.status(500).json({ message: "Failed to retrieve users", error });
    });
};

const getSingle = async (req, res) => {
    try {
        const userID = new ObjectId(req.params.id);  // Correct usage of ObjectId
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: userID });  // Use findOne to get a single document

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);  // Returning the user object directly
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
};



const createUser = async (req, res) => { 
    const user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email, 
        favoriteColor : req.body.favoriteColor,
        birthday : req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user. ');
    }
};

 const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress,
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user. ');
    }
 }

 const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').remove({_id: userId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user. ');
    }
 }

module.exports = {
    getALL,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};