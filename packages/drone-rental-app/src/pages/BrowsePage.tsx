import {useState} from 'react';
import {DroneCard} from '../components/DroneCard';
import {Cart} from '../components/Cart';
import {drones} from '../data/drones';
import {useStore} from '../store/useStore';
import type {DroneCategory, Drone} from '../types';

export const BrowsePage = () => {
    const [selectedCategory, setSelectedCategory] =
        useState<DroneCategory>('filming');
    const {addToCart} = useStore();

    const filteredDrones = drones.filter(
        (drone) => drone.category === selectedCategory
    );

    const handleAddToCart = (drone: Drone, days: number) => {
        addToCart({drone, days});
    };

    return (
        <div className='min-h-screen bg-white'>
            <header className='border-b border-amber-200 bg-white sticky top-0 z-10'>
                <div className='max-w-7xl mx-auto px-6 py-4'>
                    <h1 className='text-2xl font-bold'>SkyRent Drones</h1>
                    <p className='text-sm text-gray-600'>
                        Premium drone rentals for filming and cargo
                    </p>
                </div>
            </header>

            <div className='max-w-7xl mx-auto px-6 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2'>
                        <div className='mb-6'>
                            <div className='flex gap-2 border-b border-amber-200'>
                                <button
                                    onClick={() =>
                                        setSelectedCategory('filming')
                                    }
                                    className={`px-4 py-2 font-medium transition-colors ${
                                        selectedCategory === 'filming'
                                            ? 'border-b-2 border-amber-400 text-amber-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}>
                                    Filming Drones
                                </button>
                                <button
                                    onClick={() => setSelectedCategory('cargo')}
                                    className={`px-4 py-2 font-medium transition-colors ${
                                        selectedCategory === 'cargo'
                                            ? 'border-b-2 border-amber-400 text-amber-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}>
                                    Cargo Drones
                                </button>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {filteredDrones.map((drone) => (
                                <DroneCard
                                    key={drone.id}
                                    drone={drone}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='lg:col-span-1'>
                        <div className='sticky top-24'>
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
