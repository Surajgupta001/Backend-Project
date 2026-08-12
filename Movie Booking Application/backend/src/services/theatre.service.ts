import TheatreModel from "../models/theatre.models";

/**
 * Create a new theatre document.
 */
export const createTheatreService = async (theatreData: TheatreProps) => {
    return await TheatreModel.create(theatreData);
};

/**
 * Find a theatre by its MongoDB ObjectId.
 * Returns `null` if not found — controller decides the HTTP response.
 */
export const getTheatreByIdService = async (theatreId: string) => {
    return await TheatreModel.findById(theatreId);
};

/**
 * Fetch all theatres.
 */
export const getAllTheatresService = async () => {
    return await TheatreModel.find();
};

/**
 * Update a theatre by ID. Returns `null` if not found.
 */
export const updateTheatreService = async (theatreId: string, theatreData: Partial<TheatreProps>) => {
    return await TheatreModel.findByIdAndUpdate(
        theatreId,
        theatreData,
        {
            new: true,
            runValidators: true,
        }
    );
};

/**
 * Delete a theatre by ID. Returns `null` if not found.
 */
export const deleteTheatreService = async (theatreId: string) => {
    return await TheatreModel.findByIdAndDelete(theatreId);
};