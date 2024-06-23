import UserModel from "../models/UserModel.js";

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(401).json("user not avaliable")
        const { password, balance, ...others } = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(401).json("user not avaliable")

        await UserModel.findByIdAndUpdate(user._id, req.body)
        res.status(200).json("Updated Sucessfully")
    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) return res.status(401).json("user not avaliable")

        await UserModel.findByIdAndDelete(user._id)
        res.status(200).json("Deleted Sucessfully")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

