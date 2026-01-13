import {createBrowserRouter, RouterProvider, redirect} from 'react-router';
import {Layout} from './components/Layout';
import {ErrorPage} from './pages/ErrorPage';
import {Browse} from './routes/Browse';
import {Checkout, checkoutLoader} from './routes/Checkout';
import {Result, resultLoader} from './routes/Result';
import {Verify, verifyAction} from './routes/Verify';

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
                action: verifyAction,
            },
            {
                path: 'result',
                element: <Result />,
                loader: resultLoader,
            },
            {
                path: 'checkout',
                element: <Checkout />,
                loader: checkoutLoader,
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
