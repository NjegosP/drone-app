import type {Address, IdentityData} from 'identity-verification-sdk';

export type DroneCategory = 'filming' | 'cargo';

export type FilmingDrone = {
    id: string;
    name: string;
    category: 'filming';
    dailyPrice: number;
    image: string;
    specs: {
        camera: string;
        flightTime: string;
        maxSpeed: string;
    };
};

export type CargoDrone = {
    id: string;
    name: string;
    category: 'cargo';
    dailyPrice: number;
    image: string;
    specs: {
        loadCapacity: string;
        flightTime: string;
        range: string;
    };
};

export type Drone = FilmingDrone | CargoDrone;

export type CartItem = {
    drone: Drone;
    days: number;
};

export type {Address, IdentityData};
