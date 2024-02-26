const router = require('express').Router();
const {
    getUsers,
    getUserByID,
    createUser,
    updateUserByID,
    deleteUserByID,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users
// Get route: get all users
// Post route: create new user
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
// Get route: get user by their ID
// Put route: update user by their ID
// Delete route: delete user by their ID
router.route('/:userId')
    .get(getUserByID)
    .put(updateUserByID)
    .delete(deleteUserByID);

// /api/users/:userId/friends/:friendId
// Post route: add friend to user's friend list
// Delete route: remove friend from user's friend list
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
