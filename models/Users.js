import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    pass: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
