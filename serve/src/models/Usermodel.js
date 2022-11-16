const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 12
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
            min: 3,
            max: 12,
        },
        pais: {
            type: String,
        }
    }, {

        timestamps: true
    }
);

module.exports = mongoose.model("users", UserSchema);