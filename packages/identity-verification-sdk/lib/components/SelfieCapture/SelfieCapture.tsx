import React from 'react';
import Webcam from 'react-webcam';
import type {SelfieCaptureProp} from '../../types';
import {useSelfieCapture} from '../../hooks/useSelfieCapture';
import {CaptureIcon, RetakeIcon} from 'lib/assets/icons';

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
