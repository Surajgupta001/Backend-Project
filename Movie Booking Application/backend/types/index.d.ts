declare type MovieProps = {
    name: string;
    description: string;
    cast: string[];
    trailerUrl: string;
    language: string;
    releaseDate: Date;
    director: string;
    releaseStatus: "UPCOMING" | "RELEASED" | "ENDED";
};

declare type TheatreProps = {
    name: string;
    description: string;
    city: string;
    pinCode: number;
    address: string;
};
