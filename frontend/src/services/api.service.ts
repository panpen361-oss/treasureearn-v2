// /home/yumiko/Coding/Work/TreasureEarn/frontend/src/services/api.service.ts
import axios from 'axios';

// Assume backend runs on 3001 according to index.ts
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Crucial for receiving/sending secure HttpOnly cookies (refresh token)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach access token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor to handle 401 Unauthorized errors and auto-refresh the token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Avoid infinite loop if refresh token itself fails
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/refresh') {
            originalRequest._retry = true;

            try {
                // Backend's protectedAuth refresh expects a POST and the refresh token is in cookies
                const refreshResponse = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });

                if (refreshResponse.data?.success && refreshResponse.data?.data?.accessToken) {
                    const { accessToken } = refreshResponse.data.data;
                    localStorage.setItem('accessToken', accessToken);

                    // Re-attempt the original request with the new access token
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh token failed/expired
                localStorage.removeItem('accessToken');
                // We could dispatch a custom event here so the UI knows to completely log out
                window.dispatchEvent(new Event('auth:unauthorized'));

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
