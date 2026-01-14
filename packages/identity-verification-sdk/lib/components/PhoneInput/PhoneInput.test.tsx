import {render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {PhoneInput} from './PhoneInput';
import type {NormalizedPhoneNumber} from './types';

vi.mock('../../data/countries', () => ({
    getCountryData: () => [
        {code: 'US', dialCode: '+1', flag: '🇺🇸'},
        {code: 'RS', dialCode: '+381', flag: '🇷🇸'},
    ],
}));

describe('<PhoneInput />', () => {
    const onSubmit = vi.fn<(data: NormalizedPhoneNumber) => void>();

    beforeEach(() => {
        onSubmit.mockClear();
    });

    it('renders form controls', () => {
        render(<PhoneInput onSubmit={onSubmit} />);

        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Submit')).toBeInTheDocument();
    });

    it('renders country options', () => {
        render(<PhoneInput onSubmit={onSubmit} />);

        const options = screen.getAllByRole('option');

        expect(options).toHaveLength(2);
        expect(options[0]).toHaveValue('+1');
        expect(options[1]).toHaveValue('+381');
    });

    it('uses +1 as the default country code', () => {
        render(<PhoneInput onSubmit={onSubmit} />);
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe('+1');
    });

    it('limits phone number to 15 characters', () => {
        render(<PhoneInput onSubmit={onSubmit} />);
        const phoneInput = screen.getByLabelText(
            /phone number/i
        ) as HTMLInputElement;

        expect(phoneInput).toHaveAttribute('maxLength', '15');
    });
});
