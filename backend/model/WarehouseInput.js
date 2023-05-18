import mongoose from "mongoose"

import { SUPPLIER } from "../constant.js";

const { Schema } = mongoose
const StorekeeperSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unit_price: {
            type: Number,
            required: true
        },
        supplier: {
            type: String,
            enum: Object.values(SUPPLIER)
        },
        import_date: {
            type: Date,
            default: Date.now()
        },
        import_by: {
            type: Schema.Types.ObjectId,
            ref: 'staffs',
            required: true
        },
        note: {
            type: String
        }

    },
    { timestamps: true }

)

export default mongoose.model('storekeeper', StorekeeperSchema)