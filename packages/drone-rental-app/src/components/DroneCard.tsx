import {useState} from 'react';
import type {Drone} from '../types';

type DroneCardProps = {
    drone: Drone;
    onAddToCart: (drone: Drone, days: number) => void;
};

export const DroneCard = ({drone, onAddToCart}: DroneCardProps) => {
    const [days, setDays] = useState(1);

    return (
        <div className='border border-amber-200 rounded-lg p-3 sm:p-4 flex flex-col gap-2 sm:gap-3'>
            <img
                src={drone.image}
                alt={drone.name}
                className='w-full h-40 sm:h-48 object-cover rounded-md'
            />
            <div>
                <h3 className='text-base sm:text-lg font-semibold'>
                    {drone.name}
                </h3>
                <p className='text-sm text-gray-600'>${drone.dailyPrice}/day</p>
            </div>
            <div className='text-sm space-y-2'>
                {drone.specs.map((spec) => (
                    <InfoRow
                        key={spec.label}
                        label={spec.label}
                        value={spec.value}
                    />
                ))}
            </div>
            <div className='flex gap-2 justify-around items-center mt-auto py-2 flex-wrap sm:flex-nowrap'>
                <div className='flex gap-2 items-center'>
                    <input
                        type='number'
                        min='1'
                        max='30'
                        value={days}
                        onChange={(e) =>
                            setDays(Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className='py-1.5 sm:py-2 px-2 sm:px-3 rounded-xs border border-amber-200 bg-transparent text-sm outline-none focus:ring-1 focus:ring-amber-400 w-16 sm:w-20'
                    />
                    <span className='text-sm'>days</span>
                </div>
                <button
                    onClick={() => onAddToCart(drone, days)}
                    className='w-[50%] sm:w-auto sm:ml-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors text-sm font-medium'>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

const InfoRow = ({label, value}: {label: string; value: string}) => (
    <p className='py-0.5'>
        <span className='font-medium'>{label}:</span> {value}
    </p>
);
