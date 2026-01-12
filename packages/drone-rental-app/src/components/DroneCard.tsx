import {useState} from 'react';
import type {Drone} from '../types';

type DroneCardProps = {
    drone: Drone;
    onAddToCart: (drone: Drone, days: number) => void;
};

export const DroneCard = ({drone, onAddToCart}: DroneCardProps) => {
    const [days, setDays] = useState(1);

    return (
        <div className='border border-amber-200 rounded-lg p-4 flex flex-col gap-3'>
            <img
                src={drone.image}
                alt={drone.name}
                className='w-full h-48 object-cover rounded-md'
            />
            <div>
                <h3 className='text-lg font-semibold'>{drone.name}</h3>
                <p className='text-sm text-gray-600'>${drone.dailyPrice}/day</p>
            </div>
            <div className='text-sm space-y-1'>
                {drone.category === 'filming' ? (
                    <>
                        <p>
                            <span className='font-medium'>Camera:</span>{' '}
                            {drone.specs.camera}
                        </p>
                        <p>
                            <span className='font-medium'>Flight Time:</span>{' '}
                            {drone.specs.flightTime}
                        </p>
                        <p>
                            <span className='font-medium'>Max Speed:</span>{' '}
                            {drone.specs.maxSpeed}
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            <span className='font-medium'>Load Capacity:</span>{' '}
                            {drone.specs.loadCapacity}
                        </p>
                        <p>
                            <span className='font-medium'>Flight Time:</span>{' '}
                            {drone.specs.flightTime}
                        </p>
                        <p>
                            <span className='font-medium'>Range:</span>{' '}
                            {drone.specs.range}
                        </p>
                    </>
                )}
            </div>
            <div className='flex gap-2 items-center mt-auto'>
                <input
                    type='number'
                    min='1'
                    max='30'
                    value={days}
                    onChange={(e) =>
                        setDays(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className='py-2 px-3 rounded-xs border border-amber-200 bg-transparent text-sm outline-none focus:ring-1 focus:ring-amber-400 w-20'
                />
                <span className='text-sm'>days</span>
                <button
                    onClick={() => onAddToCart(drone, days)}
                    className='ml-auto px-4 py-2 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition-colors text-sm font-medium'>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
