import CaptureIcon from '@/assets/capture.svg?react';
import RetakeIcon from '@/assets/repeat.svg?react';
import React, {useRef, useState} from 'react';
import Webcam from 'react-webcam';
import type {SelfieCaptureProp} from '../../types';

export const SelfieCapture: React.FC<SelfieCaptureProp> = ({
    onCapture,
    onError,
    videoConstraints,
}) => {
    const webcamRef = useRef<Webcam>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    // const [permissionStatus, setPermissionStatus] = useState<
    //     PermissionState | 'error'
    // >('prompt');

    const handleCapture = () => {
        console.log('capture');
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImageSrc(imageSrc);
            onCapture(imageSrc ?? '');
        }
    };

    // TO DO -- Check if I need this permission status handling
    // TO DO -- I should probably extract this into a custom hook
    // TO DO -- See if better to use vanilla JS approach, not the library
    // useEffect(() => {
    //     const checkCameraPermission = async () => {
    //         try {
    //             const permissionObj = await navigator.permissions.query({
    //                 name: 'camera',
    //             });

    //             setPermissionStatus(permissionObj.state); // 'granted', 'denied', or 'prompt'

    //             permissionObj.onchange = () => {
    //                 setPermissionStatus(permissionObj.state);
    //             };
    //         } catch (error) {
    //             console.error('Error checking camera permission:', error);
    //             setPermissionStatus('error');
    //         }
    //     };
    //     checkCameraPermission();
    // }, []);

    // if (permissionStatus === 'prompt') {
    //     return <p>Loading...</p>;
    // }

    // if (permissionStatus === 'error' || permissionStatus === 'denied') {
    //     return <p>Denied!</p>;
    // }

    return (
        <div className='flex flex-col items-center'>
            <div className='relative'>
                <Webcam
                    className='rounded-xl border-gray-800'
                    ref={webcamRef}
                    width='100%'
                    height='100%'
                    videoConstraints={videoConstraints}
                    onUserMedia={(a) => {
                        console.log(a);
                        console.log('onUserMedia');
                    }}
                    onUserMediaError={(error) => {
                        console.log('error');
                        return onError && onError(error);
                    }}
                />
                {imageSrc ? (
                    <img
                        className='absolute top-0 left-0 rounded-xl border-gray-800'
                        src={imageSrc}
                    />
                ) : (
                    <FaceGuide />
                )}
            </div>
            <button
                className='rounded-full bg-white w-10 h-10 flex items-center justify-center relative'
                onClick={imageSrc ? () => setImageSrc(null) : handleCapture}>
                {imageSrc ? (
                    <RetakeIcon className='w-5 h-5' />
                ) : (
                    <CaptureIcon className='w-5 h-5' />
                )}
            </button>
        </div>
    );
};

const FaceGuide = () => (
    <div className='absolute top-[10%] left-[25%] rounded-xl w-[50%] h-[75%] border-2 border-gray-100' />
);
