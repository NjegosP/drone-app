import {createBrowserRouter, RouterProvider} from 'react-router';
import {BrowsePage} from './routes/Browse';
import {CheckoutPage} from './routes/CheckoutPage';
import {ResultPage} from './routes/ResultPage';
import {VerifyPage} from './routes/VerifyPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <BrowsePage />,
    },
    {
        path: '/verify',
        element: <VerifyPage />,
    },
    {
        path: '/result',
        element: <ResultPage />,
    },
    {
        path: '/checkout',
        element: <CheckoutPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
