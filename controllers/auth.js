import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        confirmPassword: confirmPassword,
    })

    // handle errors
    const handleErrors = (err) => {
        console.log(err.message, err.code);
        let errors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
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

    try {
        await newUser.save();
        return res.status(201).json({ message: "User succsessfully registered "});
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
}

export const login = async (req, res) => {

}