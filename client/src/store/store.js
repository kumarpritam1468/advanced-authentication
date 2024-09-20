import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    isCheckingAuth: true,

    signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('/api/auth/signup', { name, email, password });

            set({ user: response.data.user, isLoading: false, isAuthenticated: true });

            // console.log(response);
        } catch (error) {
            set({ error: error.response.data.message || "Error Signing up", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('/api/auth/verify-email', { code });

            set({ user: response.data.user, isLoading: false, isAuthenticated: true, isCheckingAuth: false });

            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error Signing up", isLoading: false });
            throw error;
        }
    },
}));