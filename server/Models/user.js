const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,

    },
    lastname: {
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match:/^(\+?\d{1,3})?[-\s]?\d{3,4}[-\s]?\d{3,4}$/,
    },
},
    { timestamps: true }
);

var User = mongoose.model("USERS", schema);

module.exports = User;