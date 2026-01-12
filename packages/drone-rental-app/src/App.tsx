import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {BrowsePage} from './pages/BrowsePage';
import {VerifyPage} from './pages/VerifyPage';
import {ResultPage} from './pages/ResultPage';
import {CheckoutPage} from './pages/CheckoutPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BrowsePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/result" element={<ResultPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
