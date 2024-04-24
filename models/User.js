import mongoose from "mongoose";
import pkg from "validator";
import bcrypt from "bcryptjs"

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

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

export default mongoose.model('User', UserSchema);
