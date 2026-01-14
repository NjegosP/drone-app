import React from 'react';
import Webcam from 'react-webcam';
import type {SelfieCaptureProp} from '../../types';
import {useSelfieCapture} from '../../hooks/useSelfieCapture';

const CaptureIcon = () => (
    <svg
        fill="currentColor"
        width="20"
        height="20"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0 28v-20q0-0.832 0.576-1.408t1.44-0.576h4q0.8 0 1.408-0.576t0.576-1.44 0.576-1.408 1.44-0.576h12q0.8 0 1.408 0.576t0.576 1.408 0.576 1.44 1.44 0.576h4q0.8 0 1.408 0.576t0.576 1.408v20q0 0.832-0.576 1.44t-1.408 0.576h-28q-0.832 0-1.44-0.576t-0.576-1.44zM6.016 16q0 2.048 0.768 3.904t2.144 3.168 3.2 2.144 3.872 0.8q2.72 0 5.024-1.344t3.648-3.648 1.344-5.024-1.344-4.992-3.648-3.648-5.024-1.344q-2.016 0-3.872 0.8t-3.2 2.112-2.144 3.2-0.768 3.872zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256z" />
    </svg>
);

const RetakeIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14 7H15.9992C19.3129 7 21.9992 9.68629 21.9992 13C21.9992 16.3137 19.3129 19 15.9992 19H8C4.68629 19 2 16.3137 2 13C2 9.68629 4.68629 7 8 7H10M7 4L10 7M10 7L7 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const SelfieCapture: React.FC<SelfieCaptureProp> = ({
    onCapture,
    onError,
    videoConstraints,
}) => {
    const {
        webcamRef,
        imageSrc,
        hasError,
        isImageProcessing,
        processingError,
        handleActionClick,
        handleUserMediaError,
    } = useSelfieCapture({onCapture, onError});

    if (hasError) {
        return <WebCamPermissionError />;
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='relative min-w-fit'>
                <Webcam
                    className='rounded-xl border-gray-800'
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat='image/jpeg'
                    mirrored
                    videoConstraints={videoConstraints}
                    onUserMediaError={handleUserMediaError}
                />
                {imageSrc ? (
                    <>
                        <img
                            className='absolute top-0 left-0 rounded-xl border-gray-800'
                            src={imageSrc}
                        />
                        {isImageProcessing && <Loader />}
                        {processingError && <ProcessingErrorOverlay />}
                    </>
                ) : (
                    <FaceGuide />
                )}
            </div>
            <button
                className='rounded-full mt-2 bg-white w-10 h-10 flex items-center justify-center relative'
                onClick={handleActionClick}>
                {imageSrc ? <RetakeIcon /> : <CaptureIcon />}
            </button>
        </div>
    );
};

const FaceGuide = () => (
    <div className='absolute top-[10%] left-[25%] rounded-xl w-[50%] h-[75%] border-2 border-gray-100' />
);

const ProcessingErrorOverlay = () => (
    <div className='absolute bottom-0 left-0 right-0'>
        <p className='text-red-600 text-sm text-center py-2'>
            ⚠️ Image quality check failed. Please retake.
        </p>
    </div>
);

const WebCamPermissionError = () => (
    <div className='flex flex-col items-center'>
        <div className='relative'>
            <div className='rounded-xl border-gray-800 w-full h-full flex items-center justify-center bg-gray-100 p-8 text-center'>
                <p className='text-gray-700'>
                    Camera access was denied. Please allow camera permissions to
                    take a selfie.
                </p>
            </div>
        </div>
    </div>
);

const Loader = () => (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl'>
        <div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin' />
    </div>
);
