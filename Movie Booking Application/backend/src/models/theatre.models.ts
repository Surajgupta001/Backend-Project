import mongoose, { Schema } from "mongoose";

const theatreSchema = new Schema<TheatreProps>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    addresses: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const TheatreModel = mongoose.model<TheatreProps>("Theatre", theatreSchema);

export default TheatreModel;