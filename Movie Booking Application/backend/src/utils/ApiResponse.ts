/**
 * Standardized success response wrapper.
 *
 * Use this in every controller to ensure a consistent JSON envelope:
 *
 * @example
 *   res.status(200).json(new ApiResponse(200, movies, "Movies fetched successfully"));
 *
 * Output:
 *   {
 *     "success": true,
 *     "statusCode": 200,
 *     "message": "Movies fetched successfully",
 *     "data": [ ... ]
 *   }
 */
export class ApiResponse<T> {
    public readonly success: boolean;
    public readonly statusCode: number;
    public readonly message: string;
    public readonly data: T;

    constructor(statusCode: number, data: T, message = "Success") {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
