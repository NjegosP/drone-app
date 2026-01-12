import {AddressForm, PhoneInput} from '../lib';
import './App.css';

function App() {
    return (
        <>
            <h1>Demo app</h1>
            {/* <SelfieCapture onCapture={() => console.log('captured')} /> */}
            <AddressForm />
            <PhoneInput onSubmit={(d) => console.log(d)} />
        </>
    );
}

export default App;
