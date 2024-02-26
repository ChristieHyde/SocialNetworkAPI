const router = require('express').Router();
const {
    getThoughts,
    getThoughtByID,
    createThought,
    updateThoughtByID,
    deleteThoughtByID,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
// Get route: get all thoughts
// Post route: create new thought
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
// Get route: get a thought by its ID
// Put route: update a thought by its ID
// Delete route: delete a thought by its ID
router.route('/:thoughtId')
    .get(getThoughtByID)
    .put(updateThoughtByID)
    .delete(deleteThoughtByID);

// /api/thoughts/:thoughtId/reactions
// Post route: create a reaction and store it in a thought's reaction list
// Delete route: delete a reaction by its ID and remove it from the thought's reaction list
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;
