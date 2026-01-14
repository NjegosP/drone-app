import type {Address, IdentityData} from 'identity-verification-sdk';

export type DroneCategory = 'filming' | 'cargo';

export type Spec = {
    label: string;
    value: string;
};

export type Drone = {
    id: string;
    name: string;
    category: DroneCategory;
    dailyPrice: number;
    image: string;
    specs: Spec[];
};

export type CartItem = {
    drone: Drone;
    days: number;
};

export type {Address, IdentityData};
