const { Schema, Types } = require('mongoose');

console.log(3);
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Getter to format the date of creation
function formatDate(date) {
    return date.toString();
}

module.exports = reactionSchema;