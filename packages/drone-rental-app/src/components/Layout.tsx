import {Outlet} from 'react-router';
import {Header} from './Header';

export const Layout = () => {
    return (
        <div className='min-h-screen bg-white'>
            <Header />
            <Outlet />
        </div>
    );
};
