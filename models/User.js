import mongoose, { Schema} from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        requires: true,
    },
    lastName: {
        type: String,
        requires: true,
    },
    email: {
        type: String,
        requires: true,
    },
    password: {
        type: String,
        requires: true,
    },
    confirmPassword: {
        type: String,
        requires: true,
    },
});

export default mongoose.model('User', UserSchema);
