// /home/yumiko/Coding/Work/TreasureEarn/frontend/src/store/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/auth.types';
import { AuthService } from '../services/auth.service';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await AuthService.login(email, password);
                    // Assuming successful login returns accessToken and user
                    localStorage.setItem('accessToken', data.accessToken);
                    set({
                        user: data.user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error: any) {
                    // Extract specific message from backend response if available
                    const errorMsg = error.response?.data?.error?.message || error.message || 'Login failed';
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: errorMsg,
                    });
                    throw new Error(errorMsg);
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    // Attempt graceful backend logout if requested
                    // Since get() has access to token implicitly via api.service interceptor
                    await AuthService.logout();
                } catch (error) {
                    console.warn('Backend logout failed, proceeding with local clear', error);
                } finally {
                    localStorage.removeItem('accessToken');
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                }
            },

            fetchUser: async () => {
                if (!localStorage.getItem('accessToken')) {
                    set({ isAuthenticated: false, user: null });
                    return;
                }

                set({ isLoading: true, error: null });
                try {
                    const user = await AuthService.getMe();
                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    // handled gracefully by api.service interceptor (refresh token, etc)
                    // If all fails, unauthorized event gets emitted
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        // don't always show user "Session expired" directly here unless needed
                    });
                }
            },

            clearError: () => set({ error: null })
        }),
        {
            name: 'auth-storage', // unique name
            // Only keep 'isAuthenticated' in primary storage (localStorage)
            // User data could be fetched via JWT refresh on initial load, or stored if desired.
            partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
        }
    )
);

// Listen to the unauthorized event emitted by Axios auth layout
window.addEventListener('auth:unauthorized', () => {
    useAuthStore.getState().logout();
});
