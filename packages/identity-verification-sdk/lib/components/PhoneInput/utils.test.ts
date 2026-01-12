import {describe, expect, it} from 'vitest';
import {formatPhoneToE164, isValidPhoneNumber} from './utils';

describe('formatPhoneToE164', () => {
    it('formats valid US phone number to E.164', () => {
        const result = formatPhoneToE164({
            countryCode: '+1',
            phoneNumber: '4155552671',
        });

        expect(result).toEqual({
            phoneNumber: '+14155552671',
        });
    });

    it('formats valid UK phone number to E.164', () => {
        const result = formatPhoneToE164({
            countryCode: '+44',
            phoneNumber: '2071838750',
        });

        expect(result).toEqual({
            phoneNumber: '+442071838750',
        });
    });

    it('formats valid Serbian phone number to E.164', () => {
        const result = formatPhoneToE164({
            countryCode: '+381',
            phoneNumber: '611234567',
        });

        expect(result).toEqual({
            phoneNumber: '+381611234567',
        });
    });

    it('handles phone numbers with different lengths', () => {
        const result = formatPhoneToE164({
            countryCode: '+1',
            phoneNumber: '2025551234',
        });

        expect(result).toEqual({
            phoneNumber: '+12025551234',
        });
    });
});

describe('isValidPhoneNumber', () => {
    it('validates correct US phone number', () => {
        expect(isValidPhoneNumber('+1', '4155552671')).toBe(true);
    });

    it('validates correct UK phone number', () => {
        expect(isValidPhoneNumber('+44', '2071838750')).toBe(true);
    });

    it('rejects invalid phone number', () => {
        expect(isValidPhoneNumber('+1', '123')).toBe(false);
    });

    it('rejects phone number with wrong country code', () => {
        expect(isValidPhoneNumber('+44', '4155552671')).toBe(false);
    });

    it('rejects empty phone number', () => {
        expect(isValidPhoneNumber('+1', '')).toBe(false);
    });

    it('rejects non-numeric characters', () => {
        expect(isValidPhoneNumber('+1', 'abc123')).toBe(false);
    });

    it('handles malformed input gracefully', () => {
        expect(isValidPhoneNumber('invalid', '123')).toBe(false);
    });
});
