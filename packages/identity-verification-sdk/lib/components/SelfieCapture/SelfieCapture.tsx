import React, {Fragment, useRef, useState} from 'react';
import Webcam from 'react-webcam';
import type {SelfieCaptureProp} from '../../types';
import CaptureIcon from '../../../assets/capture.svg?react';

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
            <Webcam
                className='rounded-xl border-gray-800 border-4'
                ref={webcamRef}
                width='100%'
                height='100%'
                videoConstraints={videoConstraints}
                onUserMedia={(a) => {
                    console.log(a);
                    console.log('onUserMedia');
                }}
                // TO DO -- Do something about this
                onUserMediaError={(error) => {
                    console.log('error');
                    return onError && onError(error);
                }}
            />
            {imageSrc ? (
                <img
                    className='absolute top-0 left-0 rounded-xl border-gray-800 border-4'
                    src={imageSrc}
                />
            ) : (
                <FaceGuide />
            )}
            <button
                className='w-[50%] bg-white border-0 px-3 py-3 rounded-xl text-cyan-950 flex items-center justify-center gap-2'
                onClick={!imageSrc ? handleCapture : () => setImageSrc(null)}>
                <CaptureIcon className='w-5 h-5' />
            </button>
        </div>
    );
};

const FaceGuide = () => (
    <div className='absolute top-0 left-0 rounded-xl w-full h-full'>
        <div className='w-[40%] h-[60%] mt-12 mx-auto rounded-xl ' />
    </div>
);
