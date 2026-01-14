import {useRef, useState} from 'react';
import Webcam from 'react-webcam';
import {analyzeImageQuality} from '../services/imageProcessingService';

interface UseSelfieCapture {
    onCapture: (image: string) => void;
    onError?: (error: string | DOMException) => void;
}

export const useSelfieCapture = ({onCapture, onError}: UseSelfieCapture) => {
    const webcamRef = useRef<Webcam>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const [isImageProcessing, setIsImageProcessing] = useState(false);
    const [processingError, setProcessingError] = useState(false);

    const handleCapture = async () => {
        const imageSrc = webcamRef.current?.getScreenshot();

        if (!imageSrc) return;

        setImageSrc(imageSrc);
        setIsImageProcessing(true);
        setProcessingError(false);

        analyzeImageQuality(imageSrc)
            .then(({isGoodQuality, image}) => {
                if (isGoodQuality) {
                    onCapture(image);
                } else {
                    setProcessingError(true);
                }
            })
            .finally(() => setIsImageProcessing(false));
    };

    const handleActionClick = () => {
        if (imageSrc) {
            setImageSrc(null);
            setProcessingError(false);
            return;
        }

        handleCapture();
    };

    const handleUserMediaError = (error: string | DOMException) => {
        console.error('Camera error:', error);
        setHasError(true);
        return onError && onError(error);
    };

    return {
        webcamRef,
        imageSrc,
        hasError,
        isImageProcessing,
        processingError,
        handleActionClick,
        handleUserMediaError,
    };
};
