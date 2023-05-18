import mongoose from "mongoose";
const { Schema } = mongoose;

const DeliveryReportSchema = new Schema(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: "cars",
      required: true,
    },
    distances: [
      {
        type: Schema.Types.ObjectId,
        ref: "distances",
      },
    ],
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Delivery_Report", DeliveryReportSchema);
