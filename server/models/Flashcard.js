const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CardSchema = new Schema({
    vocabulary: {
        type: String,
        required: true,
    },
    example: {
        type: String,
        required: true,
    },
    image:  {
        data: Buffer,
        contentType: String
    },
    meaning: {
        type: String,
        required: true,
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('cards', CardSchema);