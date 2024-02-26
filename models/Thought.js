const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            unique: true,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

// Getter to format the date of creation
function formatDate(date) {
    return date.toString();
}

// Virtual to get the number of reactions to the thought
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
