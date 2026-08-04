import mongoose, { Schema } from "mongoose";

const theatreSchema = new Schema<TheatreProps>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    pinCode: {
        type: Number,
        required: true,
    },
    addresses: {
        type: String,
        required: true,
        trim: true,
    },
});

const TheatreModel = mongoose.model<TheatreProps>("Theatre", theatreSchema);

export default TheatreModel;