import type {Drone} from '../types';

export const drones: Drone[] = [
    {
        id: '1',
        name: 'DJI Mavic 3 Pro',
        category: 'filming',
        dailyPrice: 150,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400',
        specs: {
            camera: 'Hasselblad 4/3 CMOS 20MP',
            flightTime: '43 minutes',
            maxSpeed: '47 mph',
        },
    },
    {
        id: '2',
        name: 'DJI Inspire 3',
        category: 'filming',
        dailyPrice: 300,
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400',
        specs: {
            camera: 'X9-8K Air 8K',
            flightTime: '28 minutes',
            maxSpeed: '58 mph',
        },
    },
    {
        id: '3',
        name: 'Autel EVO II Pro',
        category: 'filming',
        dailyPrice: 120,
        image: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=400',
        specs: {
            camera: '6K HDR Video',
            flightTime: '40 minutes',
            maxSpeed: '45 mph',
        },
    },
    {
        id: '4',
        name: 'FreeFly Alta X',
        category: 'cargo',
        dailyPrice: 500,
        image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400',
        specs: {
            loadCapacity: '35 lbs',
            flightTime: '20-50 minutes',
            range: '5 miles',
        },
    },
    {
        id: '5',
        name: 'DJI Matrice 300 RTK',
        category: 'cargo',
        dailyPrice: 400,
        image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400',
        specs: {
            loadCapacity: '6.4 lbs',
            flightTime: '55 minutes',
            range: '9.3 miles',
        },
    },
    {
        id: '6',
        name: 'Griff 300',
        category: 'cargo',
        dailyPrice: 600,
        image: 'https://images.unsplash.com/photo-1521405924368-64a41abc672e?w=400',
        specs: {
            loadCapacity: '500 lbs',
            flightTime: '45 minutes',
            range: '12 miles',
        },
    },
];
