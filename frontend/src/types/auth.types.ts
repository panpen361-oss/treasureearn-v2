// /home/yumiko/Coding/Work/TreasureEarn/frontend/src/types/auth.types.ts

export type Role = "admin" | "user" | "moderator";
export type UserStatus = "active" | "banned" | "suspended";
export type RiskTier = "low" | "medium" | "high";

export interface User {
    id: string;
    email: string;
    username: string;
    role: Role;
    status: UserStatus;
    emailVerifiedAt: string | null;
    referralCode: string | null;
    referredBy: string | null;
    availableBalance: string;
    pendingBalance: string;
    lockedBalance: string;
    lifetimeEarned: string;
    lifetimeWithdrawn: string;
    riskTier: RiskTier;
    fraudScore: number;
    chargebackScore: number;
    createdAt: string;
    updatedAt: string;
}

export type ApiResponse<T> =
    | {
        success: true;
        data: T;
    }
    | {
        success: false;
        error: {
            code: string;
            message: string;
        };
    };

export interface LoginResponse {
    accessToken: string;
    user: User;
}

export interface RefreshResponse {
    accessToken: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface GenericMessageResponse {
    message: string;
}
