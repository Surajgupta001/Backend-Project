import TheatreModel from "../models/theatre.models";

export const createTheatreService = async (theatreData: TheatreProps): Promise<TheatreProps> => {
    return await TheatreModel.create(theatreData);
};

export const getTheatresService = async (theatreId: string): Promise<TheatreProps> => {
    const theatre = await TheatreModel.findById(theatreId);
    if (!theatre) {
        throw new Error("Theatre not found");
    }
    return theatre;
};