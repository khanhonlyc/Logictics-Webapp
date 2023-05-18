import mongoose from "mongoose"
const { Schema } = mongoose

const CargoHandlingSchema = new Schema(
    {
        cargohandlingId: {
            type: String,
            unique: true,
            required: true
        },
        product_name: {
            type: String,
            required: true
        },
        quatity: {
            type: String,
            required: true
        },
        woker_name: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'staffs'
        },
        notes: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
)

export default mongoose.model('cargo_handling', CargoHandlingSchema)