const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    collections: {
        type: Array,
        required: true,
    },
    liked: {
        type: Array,
        required: true,
    }
})

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile