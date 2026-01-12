import {create} from 'zustand';
import type {CartItem, IdentityData, Address} from '../types';

type Store = {
    cart: CartItem[];
    verificationData: IdentityData | null;
    currentStep: 'browse' | 'verify' | 'result' | 'checkout';
    selfieUrl: string | null;
    phone: string | null;
    address: Address | null;
    addToCart: (item: CartItem) => void;
    removeFromCart: (droneId: string) => void;
    updateCartItemDays: (droneId: string, days: number) => void;
    clearCart: () => void;
    setVerificationData: (data: IdentityData) => void;
    setCurrentStep: (step: 'browse' | 'verify' | 'result' | 'checkout') => void;
    resetVerification: () => void;
    setSelfieUrl: (url: string) => void;
    setPhone: (phone: string) => void;
    setAddress: (address: Address) => void;
};

export const useStore = create<Store>((set) => ({
    cart: [],
    verificationData: null,
    currentStep: 'browse',
    selfieUrl: null,
    phone: null,
    address: null,
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
    updateCartItemDays: (droneId, days) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.drone.id === droneId ? {...item, days} : item
            ),
        })),
    clearCart: () => set({cart: []}),
    setVerificationData: (data) => set({verificationData: data}),
    setCurrentStep: (step) => set({currentStep: step}),
    resetVerification: () =>
        set({
            verificationData: null,
            currentStep: 'browse',
            selfieUrl: null,
            phone: null,
            address: null,
        }),
    setSelfieUrl: (url) => set({selfieUrl: url}),
    setPhone: (phone) => set({phone}),
    setAddress: (address) => set({address}),
}));
