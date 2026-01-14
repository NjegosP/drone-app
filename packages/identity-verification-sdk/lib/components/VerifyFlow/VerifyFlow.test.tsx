import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi, beforeEach} from 'vitest';
import type {ModuleConfig} from '../../common';
import {VerifyFlow} from './VerifyFlow';

const mockGetUserMedia = vi.fn();
const defaultFlowConfig: ModuleConfig[] = [
    {module: 'selfie'},
    {module: 'phone'},
    {module: 'address'},
];

beforeEach(() => {
    // Object.defineProperty(global.navigator, 'mediaDevices', {
    //     writable: true,
    //     value: {
    //         getUserMedia: mockGetUserMedia,
    //     },
    // });

    mockGetUserMedia.mockResolvedValue({
        getTracks: () => [],
        getVideoTracks: () => [{stop: vi.fn()}],
    });
});

describe('VerifyFlow', () => {
    it('renders selfie capture step initially', () => {
        const onComplete = vi.fn();
        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} />);

        expect(
            screen.getByRole('button', {name: /capture/i})
        ).toBeInTheDocument();
    });

    it('has continue button disabled before selfie is captured', () => {
        const onComplete = vi.fn();
        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} />);

        const continueButton = screen.getByRole('button', {name: /continue/i});
        expect(continueButton).toBeDisabled();
    });

    it('enables continue button after selfie is captured', async () => {
        const onComplete = vi.fn();
        const user = userEvent.setup();
        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} />);

        const captureButton = screen.getByLabelText('capture');
        await user.click(captureButton);

        await waitFor(() => {
            const continueButton = screen.getByRole('button', {
                name: /continue/i,
            });
            expect(continueButton).toBeEnabled();
        });
    });

    it('progresses to phone step after clicking continue', async () => {
        const onComplete = vi.fn();
        const user = userEvent.setup();
        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} />);

        const captureButton = screen.getByLabelText('capture');
        await user.click(captureButton);

        await waitFor(() => {
            expect(
                screen.getByRole('button', {name: /continue/i})
            ).toBeInTheDocument();
        });

        const continueButton = screen.getByRole('button', {name: /continue/i});
        await user.click(continueButton);

        await waitFor(() => {
            expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
        });
    });

    it('progresses to address step after phone submission', async () => {
        const onComplete = vi.fn();
        const user = userEvent.setup();
        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} />);

        const captureButton = screen.getByLabelText('capture');
        await user.click(captureButton);

        await waitFor(() => {
            expect(
                screen.getByRole('button', {name: /continue/i})
            ).toBeInTheDocument();
        });

        const continueButton = screen.getByRole('button', {name: /continue/i});
        await user.click(continueButton);

        await waitFor(() => {
            expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
        });

        const phoneInput = screen.getByLabelText('Phone number');
        await user.type(phoneInput, '4155552671');

        const phoneSubmitButton = screen.getAllByRole('button', {
            name: /continue/i,
        })[0];
        await user.click(phoneSubmitButton);

        await waitFor(() => {
            expect(
                screen.getByLabelText(/street address/i)
            ).toBeInTheDocument();
        });
    });

    it('calls onComplete with all data when address is submitted', async () => {
        const onComplete = vi.fn();
        const user = userEvent.setup();
        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} />);

        const captureButton = screen.getByLabelText('capture');
        await user.click(captureButton);

        await waitFor(() => {
            expect(
                screen.getByRole('button', {name: /continue/i})
            ).toBeInTheDocument();
        });

        const continueButton = screen.getByRole('button', {name: /continue/i});
        await user.click(continueButton);

        await waitFor(() => {
            expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
        });

        const phoneInput = screen.getByLabelText('Phone number');
        await user.type(phoneInput, '4155552671');

        const phoneSubmitButton = screen.getAllByRole('button', {
            name: /continue/i,
        })[0];
        await user.click(phoneSubmitButton);

        await waitFor(() => {
            expect(
                screen.getByLabelText(/street address/i)
            ).toBeInTheDocument();
        });

        await user.type(
            screen.getByLabelText(/street address/i),
            '123 Main St'
        );
        await user.type(screen.getByLabelText(/city/i), 'New York');
        await user.type(screen.getByLabelText(/state\/province/i), 'NY');
        await user.selectOptions(screen.getByLabelText(/country/i), 'US');
        await user.type(screen.getByLabelText(/zip code/i), '10001');

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(() => {
            expect(onComplete).toHaveBeenCalledWith({
                selfieUrl: expect.any(String),
                phone: '+14155552671',
                address: {
                    streetAddress: '123 Main St',
                    city: 'New York',
                    stateProvince: 'NY',
                    country: 'US',
                    zipCode: '10001',
                },
                score: expect.any(Number),
                status: expect.stringMatching(/^(verified|failed)$/),
            });
        });
    });

    it('shows error message when selfie capture fails', async () => {
        const onComplete = vi.fn();
        const onError = vi.fn();
        mockGetUserMedia.mockRejectedValueOnce(
            new Error('Camera permission denied')
        );

        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} onError={onError} />);

        await waitFor(() => {
            expect(onError).toHaveBeenCalledWith('Camera permission denied');
        });
    });

    it('displays selfie error in the UI', async () => {
        const onComplete = vi.fn();
        const onError = vi.fn();
        mockGetUserMedia.mockRejectedValueOnce(
            new Error('Camera permission denied')
        );

        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} onError={onError} />);

        await waitFor(() => {
            expect(
                screen.getByText(/camera permission denied/i)
            ).toBeInTheDocument();
        });
    });

    it('does not call onComplete if selfie is missing', async () => {
        const onComplete = vi.fn();
        const user = userEvent.setup();
        render(<VerifyFlow flowConfig={defaultFlowConfig} onComplete={onComplete} />);

        const captureButton = screen.getByLabelText('capture');
        await user.click(captureButton);

        await waitFor(() => {
            expect(
                screen.getByRole('button', {name: /continue/i})
            ).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(onComplete).not.toHaveBeenCalled();
        });
    });
});
