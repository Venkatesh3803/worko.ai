import bcrypt from "bcrypt"
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashPass;
    const newUser = await UserModel(req.body)
    try {
        const existUser = await UserModel.findOne({ email: newUser.email })
        if (existUser) return res.status(404).json("This email Already taken")

        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const loginUser = async (req, res) => {

    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) return res.status(404).json("This user doesnot exist")

        const passwordVerify = await bcrypt.compare(req.body.password, user.password)
        if (!passwordVerify) return res.status(404).json("Invalid Credentials")

        // setting accesstoken
        const accesToken = jwt.sign({
            email: user.email,
            userId: user.id,
        }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1h" })

        const { password, balance, ...others } = user._doc;

        res.cookie("accesToken", accesToken, { httpOnly: true, secure: true, })
        res.status(200).json({ ...others, accesToken })
    } catch (error) {
        res.status(500).json(error.message)
    }
}