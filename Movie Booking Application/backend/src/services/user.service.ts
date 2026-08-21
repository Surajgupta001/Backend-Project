import UserModel from "../models/user.models";
import type { AuthAdminProps } from "../types";

/**
 * Creates a user in the database.
 */
export const createUserService = async (userData: AuthAdminProps) => {
    return await UserModel.create(userData);
};