import TheatreModel from "../models/theatre.models";

export const createTheatreService = async (theatreData: TheatreProps): Promise<TheatreProps> => {
    return await TheatreModel.create(theatreData);
};