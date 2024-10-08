import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    message: null,
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
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('/api/auth/login', { email, password });

            set({ user: response.data.user, isLoading: false, isAuthenticated: true });

            toast.success(response.data.message);
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging in", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('/api/auth/logout');

            set({ user: null, isLoading: false, isAuthenticated: false });

            toast.success(response.data.message);
        } catch (error) {
            set({ error: error.response.data.message || "Error Logging out", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('/api/auth/verify-email', { code });

            set({ user: response.data.user, isLoading: false, isAuthenticated: true });

            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error Verifying email", isLoading: false });
            throw error;
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('/api/auth/forgot-password', { email });

            set({ isLoading: false, message: response.data.message });
        } catch (error) {
            set({ error: error.response.data.message || "Server Error", isLoading: false });
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`/api/auth/reset-password/${token}`, { password });

            set({ isLoading: false, message: response.data.message });
        } catch (error) {
            set({ error: error.response.data.message || "Server Error", isLoading: false });
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get('/api/auth/check-auth');

            set({ user: response.data.user, isCheckingAuth: false, isAuthenticated: true });

        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },
}));