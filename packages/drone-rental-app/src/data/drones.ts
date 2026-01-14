import type {Drone} from '../types';

export const drones: Drone[] = [
    {
        id: '1',
        name: 'DJI Mavic 3 Pro',
        category: 'filming',
        dailyPrice: 150,
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400',
        specs: [
            {label: 'Camera', value: 'Hasselblad 4/3 CMOS 20MP'},
            {label: 'Flight Time', value: '43 minutes'},
            {label: 'Max Speed', value: '47 mph'},
        ],
    },
    {
        id: '2',
        name: 'DJI Inspire 3',
        category: 'filming',
        dailyPrice: 300,
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400',
        specs: [
            {label: 'Camera', value: 'X9-8K Air 8K'},
            {label: 'Flight Time', value: '28 minutes'},
            {label: 'Max Speed', value: '58 mph'},
        ],
    },
    {
        id: '3',
        name: 'Autel EVO II Pro',
        category: 'filming',
        dailyPrice: 120,
        image: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=400',
        specs: [
            {label: 'Camera', value: '6K HDR Video'},
            {label: 'Flight Time', value: '40 minutes'},
            {label: 'Max Speed', value: '45 mph'},
        ],
    },
    {
        id: '4',
        name: 'FreeFly Alta X',
        category: 'cargo',
        dailyPrice: 500,
        image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400',
        specs: [
            {label: 'Load Capacity', value: '35 lbs'},
            {label: 'Flight Time', value: '20-50 minutes'},
            {label: 'Range', value: '5 miles'},
        ],
    },
    {
        id: '5',
        name: 'DJI Matrice 300 RTK',
        category: 'cargo',
        dailyPrice: 400,
        image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400',
        specs: [
            {label: 'Load Capacity', value: '6.4 lbs'},
            {label: 'Flight Time', value: '55 minutes'},
            {label: 'Range', value: '9.3 miles'},
        ],
    },
    {
        id: '6',
        name: 'Griff 300',
        category: 'cargo',
        dailyPrice: 600,
        image: 'https://images.unsplash.com/photo-1521405924368-64a41abc672e?w=400',
        specs: [
            {label: 'Load Capacity', value: '500 lbs'},
            {label: 'Flight Time', value: '45 minutes'},
            {label: 'Range', value: '12 miles'},
        ],
    },
];
