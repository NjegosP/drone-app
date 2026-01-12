import {useState} from 'react';
import {
    AddressForm,
    PhoneInput,
    SelfieCapture,
    getIdentityData,
    type Address,
} from '../lib';
import './App.css';

type Step = 'selfie' | 'phone' | 'address' | 'result';

function App() {
    const [currentStep, setCurrentStep] = useState<Step>('selfie');
    const [selfieUrl, setSelfieUrl] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<Address | null>(null);
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelfieCapture = (imageData: string) => {
        console.log('Selfie captured');
        setSelfieUrl(imageData);
        setCurrentStep('phone');
    };

    const handlePhoneSubmit = (data: {phoneNumber: string}) => {
        console.log('Phone submitted:', data);
        setPhone(data.phoneNumber);
        setCurrentStep('address');
    };

    const handleAddressSubmit = async (data: Address) => {
        console.log('Address submitted:', data);
        setAddress(data);
        setIsLoading(true);

        try {
            const verificationResult = await getIdentityData({
                selfieUrl,
                phone,
                address: data,
            });
            console.log('Verification result:', verificationResult);
            setResult(verificationResult);
            setCurrentStep('result');
        } catch (error) {
            console.error('Verification error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setSelfieUrl('');
        setPhone('');
        setAddress(null);
        setResult(null);
        setCurrentStep('selfie');
    };

    return (
        <div style={{maxWidth: '600px', margin: '0 auto', padding: '2rem'}}>
            <h1>Identity Verification SDK - Demo</h1>

            <div style={{marginBottom: '2rem'}}>
                <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
                    <button
                        onClick={() => setCurrentStep('selfie')}
                        style={{
                            padding: '0.5rem 1rem',
                            background:
                                currentStep === 'selfie' ? '#3b82f6' : '#e5e7eb',
                            color: currentStep === 'selfie' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}>
                        1. Selfie
                    </button>
                    <button
                        onClick={() => setCurrentStep('phone')}
                        disabled={!selfieUrl}
                        style={{
                            padding: '0.5rem 1rem',
                            background:
                                currentStep === 'phone' ? '#3b82f6' : '#e5e7eb',
                            color: currentStep === 'phone' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: selfieUrl ? 'pointer' : 'not-allowed',
                            opacity: selfieUrl ? 1 : 0.5,
                        }}>
                        2. Phone
                    </button>
                    <button
                        onClick={() => setCurrentStep('address')}
                        disabled={!phone}
                        style={{
                            padding: '0.5rem 1rem',
                            background:
                                currentStep === 'address'
                                    ? '#3b82f6'
                                    : '#e5e7eb',
                            color:
                                currentStep === 'address' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: phone ? 'pointer' : 'not-allowed',
                            opacity: phone ? 1 : 0.5,
                        }}>
                        3. Address
                    </button>
                    <button
                        onClick={() => setCurrentStep('result')}
                        disabled={!result}
                        style={{
                            padding: '0.5rem 1rem',
                            background:
                                currentStep === 'result' ? '#3b82f6' : '#e5e7eb',
                            color: currentStep === 'result' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: result ? 'pointer' : 'not-allowed',
                            opacity: result ? 1 : 0.5,
                        }}>
                        4. Result
                    </button>
                </div>

                {currentStep === 'selfie' && (
                    <div>
                        <h2>Step 1: Capture Selfie</h2>
                        <SelfieCapture onCapture={handleSelfieCapture} />
                    </div>
                )}

                {currentStep === 'phone' && (
                    <div>
                        <h2>Step 2: Enter Phone Number</h2>
                        <PhoneInput onSubmit={handlePhoneSubmit} />
                    </div>
                )}

                {currentStep === 'address' && (
                    <div>
                        <h2>Step 3: Enter Address</h2>
                        <AddressForm onSubmit={handleAddressSubmit} />
                        {isLoading && (
                            <p style={{marginTop: '1rem', color: '#6b7280'}}>
                                Verifying identity...
                            </p>
                        )}
                    </div>
                )}

                {currentStep === 'result' && result && (
                    <div>
                        <h2>Verification Result</h2>
                        <div
                            style={{
                                background: '#f3f4f6',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginTop: '1rem',
                            }}>
                            <pre
                                style={{
                                    margin: 0,
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                }}>
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                        <button
                            onClick={reset}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                background: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}>
                            Start Over
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
