import mongoose from "mongoose";
import pkg from "validator";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name cannot be blank'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name cannot be blank'],
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        unique: true,
        lowercase: true,
        validate: [pkg.isEmail, 'Enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    confirmPassword: {
        type: String,
        required: true,
    },
});

export default mongoose.model('User', UserSchema);
