import mongoose from "mongoose"

const userShema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    age: {
        type: String,
    },
    city: {
        type: String,
    },
    zip_code: {
        type: String,
    },
},
    { timestamps: true }
)


export default mongoose.model("user", userShema)