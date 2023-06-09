import mongoose from "mongoose"
import { CUSTOMER, CUSTOMER_RANK } from "../constant.js"
const { Schema } = mongoose

const CustomerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        customer_type: {
            type: String,
            enum: Object.values(CUSTOMER),
            default: CUSTOMER.PASSERS,
            required: true
        },
        rank_passers: {
            type: {
                point: Number,
                level: {
                    type: String,
                    enum: Object.values(CUSTOMER_RANK)
                }
            },
            default: {
                point: 0,
                level: CUSTOMER_RANK.UNRANK
            }
        },
        companyTaxcode_business: {
            type: String,
            default: null
        },
        bank_name: {
            type: String,
            required: true
        },
        bank_account_number: {
            type: String,
            required: true
        }
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)
CustomerSchema.virtual("orders", {
    ref: "orders",
    localField: "_id",
    foreignField: "customer",
});

export default mongoose.model('customers', CustomerSchema)