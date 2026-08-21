export const USER_ROLES = {
    customer: "CUSTOMER",
    admin: "ADMIN",
} as const;

export const USER_STATUS = {
    approved: "APPROVED",
    pending: "PENDING",
    rejected: "REJECTED",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];