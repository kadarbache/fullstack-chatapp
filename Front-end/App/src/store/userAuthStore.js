import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';

const userAuthStore=create((set)=>({
    authUser: null,
    isSignUp:true,
    isLogin: true,
    isUpdatingProfile: true,
    isChekingAuth: true,
    checkAuth: async () => {
     try {
        const res=await axiosInstance.get('/auth/check');
        set({authUser: res.data});
     } catch (error) {
        console.log(error);
        set({authUser:null});
     }   finally{
        set({isChekingAuth:false});
     }
    }
    ,
}))


export default userAuthStore; 