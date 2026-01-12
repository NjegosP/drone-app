import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {PhoneInput} from './PhoneInput';

describe('PhoneInput', () => {
    // it('renders country select and phone number input', () => {
    //     const onSubmit = vi.fn();
    //     render(<PhoneInput onSubmit={onSubmit} />);

    //     expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
    //     expect(screen.getByRole('combobox')).toBeInTheDocument();
    // });

    // it('submits valid phone number in E.164 format', async () => {
    //     const user = userEvent.setup();
    //     const onSubmit = vi.fn();
    //     render(<PhoneInput onSubmit={onSubmit} />);

    //     const phoneInput = screen.getByLabelText('Phone number');
    //     await user.type(phoneInput, '4155552671');

    //     const submitButton = screen.getByRole('button', {name: /submit/i});
    //     await user.click(submitButton);

    //     await waitFor(() => {
    //         expect(onSubmit).toHaveBeenCalledWith({
    //             phoneNumber: '+14155552671',
    //         });
    //     });
    // });

    it('prevents submission for invalid phone number', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<PhoneInput onSubmit={onSubmit} />);

        const phoneInput = screen.getByLabelText('Phone number');
        await user.type(phoneInput, '123');

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(
            () => {
                expect(onSubmit).not.toHaveBeenCalled();
            },
            {timeout: 500}
        ).catch(() => {});

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('prevents submission for empty phone number', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<PhoneInput onSubmit={onSubmit} />);

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(
            () => {
                expect(onSubmit).not.toHaveBeenCalled();
            },
            {timeout: 500}
        ).catch(() => {});

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('prevents submission for non-numeric input', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();
        render(<PhoneInput onSubmit={onSubmit} />);

        const phoneInput = screen.getByLabelText('Phone number');
        await user.type(phoneInput, 'abcd1234');

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(
            () => {
                expect(onSubmit).not.toHaveBeenCalled();
            },
            {timeout: 500}
        ).catch(() => {});

        expect(onSubmit).not.toHaveBeenCalled();
    });

    // it('allows selecting different country codes', async () => {
    //     const user = userEvent.setup();
    //     const onSubmit = vi.fn();
    //     render(<PhoneInput onSubmit={onSubmit} />);

    //     const countrySelect = screen.getByRole('combobox');
    //     await user.selectOptions(countrySelect, '+44');

    //     const phoneInput = screen.getByLabelText('Phone number');
    //     await user.type(phoneInput, '2071838750');

    //     const submitButton = screen.getByRole('button', {name: /submit/i});
    //     await user.click(submitButton);

    //     await waitFor(() => {
    //         expect(onSubmit).toHaveBeenCalledWith({
    //             phoneNumber: '+442071838750',
    //         });
    //     });
    // });

    it('defaults to +1 country code', () => {
        const onSubmit = vi.fn();
        render(<PhoneInput onSubmit={onSubmit} />);

        const countrySelect = screen.getByRole('combobox') as HTMLSelectElement;
        expect(countrySelect.value).toBe('+1');
    });
});
