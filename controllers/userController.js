const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get a single user
    async getUserByID(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json({user});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUserByID(req, res) {
        try {
            const update = req.body;
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                update
            );

  
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
  
            res.json({ message: 'User successfully updated' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a user and remove their thoughts
    async deleteUserByID(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const thought = await Thought.updateMany(
                { },
                { $pull: { username: user.username } },
                { new: true }
            );

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a friend to a user's friend list
    async addFriend(req, res) {
        console.log('You are adding a friend');

        try {
            console.log(5);
            let user = await User.findOne({ _id: req.params.userId })
            console.log(4);
            let friend = await User.findOne({ _id: req.params.friendId })
            user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: friend } }
            );
            console.log(6);

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: { _id: req.params.friendId } } }
            );
            console.log(user.friendCount);

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User not found' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
