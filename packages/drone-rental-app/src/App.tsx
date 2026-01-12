import {useStore} from './store/useStore';
import {BrowsePage} from './pages/BrowsePage';
import {VerifyPage} from './pages/VerifyPage';
import {ResultPage} from './pages/ResultPage';
import {CheckoutPage} from './pages/CheckoutPage';

function App() {
    const {currentStep} = useStore();

    switch (currentStep) {
        case 'browse':
            return <BrowsePage />;
        case 'verify':
            return <VerifyPage />;
        case 'result':
            return <ResultPage />;
        case 'checkout':
            return <CheckoutPage />;
        default:
            return <BrowsePage />;
    }
}

export default App;
