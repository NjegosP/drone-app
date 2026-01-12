import React, {Fragment, useRef, useState} from 'react';
import Webcam from 'react-webcam';
import type {SelfieCaptureProp} from '../../types';

export const SelfieCapture: React.FC<SelfieCaptureProp> = ({
    onCapture,
    onError,
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
        <Fragment>
            <div className='relative'>
                <Webcam
                    className='rounded-2xl border-gray-800 border-4'
                    ref={webcamRef}
                    width='100%'
                    height='100%'
                    videoConstraints={{width: 640, height: 480}}
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
                        className='absolute top-0 left-0 w-full h-full'
                        src={imageSrc}
                    />
                ) : (
                    <FaceGuide />
                )}
            </div>
            <div className='flex row p-4 justify-center gap-4'>
                <button onClick={handleCapture}>Capture photo</button>
                {imageSrc && (
                    <button
                        onClick={() => {
                            setImageSrc(null);
                        }}>
                        Retake photo
                    </button>
                )}
            </div>
        </Fragment>
    );
};

const FaceGuide = () => (
    <div className='absolute w-1/2 h-3/4 bottom-1/8 left-1/4 border-4 border-dashed' />
);
