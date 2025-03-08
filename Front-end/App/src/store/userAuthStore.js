import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

const userAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,
  isChekingAuth: false,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ isChekingAuth: true });
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isChekingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ isSigningUp: true });
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logout successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ isLogingIn: true });
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Login successfully");
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    } finally {
      set({ isLogingIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL);
    socket.connect();
    set({ socket: socket });
  },

  disconnectSocket: () => {
    const socket = io(BASE_URL);
    // socket.disconnect();
  },
}));


export default userAuthStore; 