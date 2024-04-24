import jwt from "jsonwebtoken";
import User from "../models/User.js";

// handle errors
const handleErrors = (err) => {
    console.log(err.message);
    let errors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    // incorrect email
    if(err.message === 'Incorrect email') {
        errors.email = err.message;
    }

    // incorrect password
    if(err.message === 'Incorrect password') {
        errors.password = err.message;
    }

    // duplicate email
    if(err.code === 11000) {
        errors.email = 'Email already exists';
        return errors;
    }

    // validation errors
    if(err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TokenSecret, {
        expiresIn: maxAge
    })
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword} = req.body;

    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    })

    try {
        const user = await newUser.save();
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        return res.status(201).json({ message: "User succsessfully registered", user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors });
    }
}

export const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
}
