import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password } = req.body
    console.log({email,password});
    try {

        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User Does not Exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" })
    }
}
export const signup = async (req, res) => {
    const { email, password, username, } = req.body

    console.log({ username, email, password });
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User Already Exist" })
        // if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't Match" })
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword, username })
        const token = jwt.sign({ email: result.email, username: result.username, id: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        res.status(200).json({ token })

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong", error })
        console.log(error);
    }

}
