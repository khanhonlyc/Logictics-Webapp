import mongoose from "mongoose"
import { CATEGORY_TYPE } from "../constant.js"
const { Schema } = mongoose

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: new Date()
        },
        categorys: {
            type: String,
            enum: Object.values(CATEGORY_TYPE),
            default: CATEGORY_TYPE.INDUSTRY_NEWS
        },
        picture: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model('blogs', BlogSchema)
