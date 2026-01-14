import {describe, it, expect, vi, beforeEach, Mock} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import {SelfieCapture} from './SelfieCapture';
import {useSelfieCapture} from '../../hooks/useSelfieCapture';

vi.mock('react-webcam', () => ({
    default: React.forwardRef(() => <div data-testid='webcam' />),
}));

vi.mock('../../assets/icons', () => ({
    CaptureIcon: () => <div data-testid='capture-icon' />,
    RetakeIcon: () => <div data-testid='retake-icon' />,
}));

vi.mock('../../hooks/useSelfieCapture', () => ({
    useSelfieCapture: vi.fn(),
}));

const mockedUseSelfieCapture = useSelfieCapture as Mock;

const baseHookState = {
    webcamRef: {current: null},
    imageSrc: null,
    validatedImage: null,
    hasError: false,
    isImageProcessing: false,
    processingError: null,
    handleActionClick: vi.fn(),
    handleUserMediaError: vi.fn(),
};

describe('SelfieCapture', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseSelfieCapture.mockReturnValue(baseHookState);
    });

    it('renders webcam and capture button', () => {
        render(
            <SelfieCapture
                onCapture={vi.fn()}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        expect(screen.getByTestId('webcam')).toBeInTheDocument();
        expect(screen.getByLabelText('capture')).toBeInTheDocument();
        expect(screen.getByTestId('capture-icon')).toBeInTheDocument();
    });

    it('disables Continue button when no validated image', () => {
        render(
            <SelfieCapture
                onCapture={vi.fn()}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        expect(screen.getByLabelText('Continue')).toBeDisabled();
    });

    it('calls handleActionClick when capture button is clicked', () => {
        render(
            <SelfieCapture
                onCapture={vi.fn()}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        fireEvent.click(screen.getByLabelText('capture'));
        expect(baseHookState.handleActionClick).toHaveBeenCalled();
    });

    it('shows retake button when image is present', () => {
        mockedUseSelfieCapture.mockReturnValue({
            ...baseHookState,
            imageSrc: 'image.jpg',
        });

        render(
            <SelfieCapture
                onCapture={vi.fn()}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        expect(screen.getByLabelText('retake')).toBeInTheDocument();
        expect(screen.getByTestId('retake-icon')).toBeInTheDocument();
    });

    it('enables Continue button when validated image exists', () => {
        const validatedImage = 'validated-image';

        mockedUseSelfieCapture.mockReturnValue({
            ...baseHookState,
            validatedImage,
        });

        render(
            <SelfieCapture
                onCapture={vi.fn()}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        expect(screen.getByLabelText('Continue')).toBeEnabled();
    });

    it('calls onCapture when Continue is clicked with validated image', () => {
        const onCapture = vi.fn();
        const validatedImage = 'validated-image';

        mockedUseSelfieCapture.mockReturnValue({
            ...baseHookState,
            validatedImage,
        });

        render(
            <SelfieCapture
                onCapture={onCapture}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        fireEvent.click(screen.getByLabelText('Continue'));
        expect(onCapture).toHaveBeenCalledWith(validatedImage);
    });

    it('shows loader while image is processing', () => {
        mockedUseSelfieCapture.mockReturnValue({
            ...baseHookState,
            imageSrc: 'image.jpg',
            isImageProcessing: true,
        });

        render(
            <SelfieCapture
                onCapture={vi.fn()}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('shows processing error overlay when processingError exists', () => {
        mockedUseSelfieCapture.mockReturnValue({
            ...baseHookState,
            imageSrc: 'image.jpg',
            processingError: 'error',
        });

        render(
            <SelfieCapture
                onCapture={vi.fn()}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        expect(
            screen.getByText(/image quality check failed/i)
        ).toBeInTheDocument();
    });

    it('shows camera permission error UI when hasError is true', () => {
        mockedUseSelfieCapture.mockReturnValue({
            ...baseHookState,
            hasError: true,
        });

        render(
            <SelfieCapture
                onCapture={vi.fn()}
                onError={vi.fn()}
                videoConstraints={{}}
            />
        );

        expect(
            screen.getByText(/camera access was denied/i)
        ).toBeInTheDocument();
    });
});
