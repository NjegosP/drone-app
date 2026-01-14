import {create} from 'zustand';
import type {CartItem, IdentityData} from '../types';

type Store = {
    cart: CartItem[];
    verificationData: IdentityData | null;
    addToCart: (item: CartItem) => void;
    removeFromCart: (droneId: string) => void;
    clearCart: () => void;
    setVerificationData: (data: IdentityData) => void;
    resetVerification: () => void;
};

export const useStore = create<Store>((set) => ({
    cart: [],
    verificationData: null,
    addToCart: (item) =>
        set((state) => {
            const existing = state.cart.find(
                (i) => i.drone.id === item.drone.id
            );
            if (existing) {
                return {
                    cart: state.cart.map((i) =>
                        i.drone.id === item.drone.id
                            ? {...i, days: i.days + item.days}
                            : i
                    ),
                };
            }
            return {cart: [...state.cart, item]};
        }),
    removeFromCart: (droneId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.drone.id !== droneId),
        })),
    clearCart: () => set({cart: []}),
    setVerificationData: (data) => set({verificationData: data}),
    resetVerification: () => set({verificationData: null}),
}));
