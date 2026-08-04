declare type MovieProps = {
    name: string;
    description: string;
    caste: string[];
    trailerUrl: string;
    language: string;
    releaseDate: Date;
    director: string;
    releaseStatus: string;
};

declare type TheatreProps = {
    name: string;
    description: string;
    city: string;
    pinCode: number;
    addresses: string;
};
