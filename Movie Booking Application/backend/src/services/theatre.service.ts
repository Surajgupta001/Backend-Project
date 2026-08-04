import TheatreModel from "../models/theatre.models";

export const createTheatreService = async (theatreData: TheatreProps): Promise<TheatreProps> => {
    try {
        const response = await TheatreModel.create(theatreData);
        return response;
    } catch (error) {
        console.log("Error while creating theatre", error);
        throw new Error("Error while creating theatre");
    }
};