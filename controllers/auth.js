import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        confirmPassword: req.body.confirmPassword,
    })

    try {
        await newUser.save();
        return res.status(201).json({ message: "User succsessfully registered "});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const login = async (req, res) => {

}