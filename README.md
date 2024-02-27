# Social Network API

## Description
This project is a demonstrative API to integrate with a social network similar in structure to the site formerly known as Twitter. It integrates a MongoDB database for use in any customised frontend.
The demonstrated model structure features users and the "thoughts" they can post to the site. A user may post a thought of up to 280 characters, and may post additional thoughts as reactions to other users. Users can also add each other as friends.

## Installation
Once the project has been downloaded, run `npm i` to install the required external packages, and then `node index.js` to start the server.

## Usage
A demonstration video is provided: https://app.screencastify.com/v3/watch/iDv5MQ7Wm9RxcN2OJ5Ch

The API can be demonstrated in a client akin to Insomnia before integration to a frontend is required.

Available routes include:
GET `api/users`: get all users
GET `api/users/:userId`: get a user by their ID
POST `api/users`: add a new user to the database by adding information to the request body
PUT `api/users/:userId`: get a user by their ID and update some of their data
DELETE `api/users/:userId`: get a user by their ID and delete them
POST `api/users/:userId/friends/:friendId`: get two users and add one as a friend of the other
DELETE `api/users/:userId/friends/:friendId`: get two users and remove one from the other's friend list
GET `api/thoughts`: get all thoughts
GET `api/thoughts/:thoughtId`: get a thought by its ID
POST `api/thoughts`: add a new thought to the database by adding information to the request body
PUT `api/thoughts/:thoughtId`: get a thought by its ID and update some of its data
DELETE `api/thoughts/:thoughtId`: get a thought by its ID and delete them
POST `api/thoughts/:thoughtId/reactions`: get a thought and add a reaction to it
DELETE `api/thoughts/:thoughtId/reactions`: remove a reaction to a thought

## Credit
All code is created by Christie Hyde for this project, adapted from the University of Western Australia Coding Bootcamp coursework.