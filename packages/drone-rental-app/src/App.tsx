import {createBrowserRouter, redirect, RouterProvider} from 'react-router';
import {Layout} from './components/Layout';
import {ErrorPage} from './pages/ErrorPage';
import {Browse} from './routes/Browse';
import {Checkout} from './routes/Checkout';
import {Result} from './routes/Result';
import {Verify} from './routes/Verify';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
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
                loader: () => redirect('/'),
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
