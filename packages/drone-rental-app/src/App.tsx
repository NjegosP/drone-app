import {createBrowserRouter, RouterProvider, Navigate} from 'react-router';
import {Layout} from './components/Layout';
import {ErrorPage} from './pages/ErrorPage';
import {Browse} from './routes/Browse';
import {Verify} from './routes/Verify';
import {Result} from './routes/Result';
import {Checkout} from './routes/Checkout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to='/browse' replace />,
            },
            {
                path: 'browse',
                element: <Browse />,
            },
            {
                path: 'verify',
                element: <Verify />,
            },
            {
                path: 'result',
                element: <Result />,
            },
            {
                path: 'checkout',
                element: <Checkout />,
            },
            {
                path: '*',
                element: <Navigate to='/browse' replace />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
