// /home/yumiko/Coding/Work/TreasureEarn/frontend/src/services/auth.service.ts
import { api } from './api.service';
import type {
    User,
    ApiResponse,
    LoginResponse,
    RegisterResponse,
    RefreshResponse,
    GenericMessageResponse
} from '../types/auth.types';

export const AuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', { email, password });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    register: async (data: any): Promise<RegisterResponse> => {
        const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register', data);
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    getMe: async (): Promise<User> => {
        const response = await api.get<ApiResponse<User>>('/auth/me');
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    logout: async (): Promise<GenericMessageResponse> => {
        const response = await api.post<ApiResponse<GenericMessageResponse>>('/auth/logout');
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    refresh: async (): Promise<RefreshResponse> => {
        const response = await api.post<ApiResponse<RefreshResponse>>('/auth/refresh');
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    verifyEmail: async (token: string): Promise<GenericMessageResponse> => {
        const response = await api.post<ApiResponse<GenericMessageResponse>>('/auth/verify', { token });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    verifyIp: async (token: string): Promise<GenericMessageResponse> => {
        const response = await api.post<ApiResponse<GenericMessageResponse>>('/auth/verify-ip', { token });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    sendOtp: async (email: string): Promise<GenericMessageResponse> => {
        const response = await api.post<ApiResponse<GenericMessageResponse>>('/auth/send-otp', { email });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    forgotPassword: async (email: string): Promise<GenericMessageResponse> => {
        const response = await api.post<ApiResponse<GenericMessageResponse>>('/auth/forgot-password', { email });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },

    resetPassword: async (token: string, password: string): Promise<GenericMessageResponse> => {
        const response = await api.post<ApiResponse<GenericMessageResponse>>('/auth/reset-password', { token, password });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.error.message);
    },
};
