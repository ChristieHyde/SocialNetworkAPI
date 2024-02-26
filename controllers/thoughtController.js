const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getThoughtByID(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions');

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate({
                username: req.body.username,
                $addToSet: { thoughts: thought }
            });

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThoughtByID(req, res) {
        try {
            const update = req.body
            const thought = await Thought.findOneAndUpdate({ 
                _id: req.params.thoughtId,
                update
            });

  
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
  
            res.json({ message: 'Thought successfully updated' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThoughtByID(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a reaction to the thought
    async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);

        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a reaction from the thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reaction: { reactionId: req.body.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'Thought not found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
  },
};
