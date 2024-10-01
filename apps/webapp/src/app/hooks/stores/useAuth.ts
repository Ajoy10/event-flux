import { create } from 'zustand';
import { UserProfile } from '@event-flux/types';
import axiosApi from '../../utils/axios-service';
type AuthState = {
  isAuthenticated: boolean;
  profile: null | UserProfile;
};

type AuthAction = {
  setAuthenticated: (val: boolean) => void;
  attemptLogin: () => void;
};

export const useAuthStore = create<AuthState & AuthAction>((set) => {
  return {
    isAuthenticated: false,
    profile: null,
    setAuthenticated: (val) => set({ isAuthenticated: val }),
    attemptLogin: async () => {
      try {
        const res = await axiosApi.get('/auth/verify', {
          withCredentials: true,
        });
        if (res.data.user)
          set({ isAuthenticated: true, profile: res.data.user });
        else throw new Error('Could not find the user try logging in again');
      } catch (err) {
        console.log(err);
        set({ isAuthenticated: false });
      }
    },
  };
});
