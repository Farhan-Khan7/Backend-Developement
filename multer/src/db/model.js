import mongoose from "mongoose";


const schema = mongoose.Schema({
    avatar: {
        type: String,
        required: true
    }
})

const model = mongoose.model("avatar", schema)

export default model