import {parsePhoneNumberWithError} from 'libphonenumber-js';
import type {NormalizedPhoneNumber, PhoneInputFormType} from './types';

/**
 * Converts form data to E.164 format with validation
 * @param data - Form data with countryCode and phoneNumber
 * @returns Normalized phone number in E.164 format
 */
export const formatPhoneToE164 = (
    data: PhoneInputFormType
): NormalizedPhoneNumber => {
    const fullNumber = `${data.countryCode}${data.phoneNumber}`;
    const parsedPhoneNumber =
        parsePhoneNumberWithError(fullNumber).format('E.164');

    return {phoneNumber: parsedPhoneNumber};
};

/**
 * Validates a phone number
 * @param countryCode - Dial code like "+1"
 * @param phoneNumber - National number
 * @returns true if valid, false otherwise
 */
export const isValidPhoneNumber = (
    countryCode: string,
    phoneNumber: string
): boolean => {
    try {
        const fullNumber = `${countryCode}${phoneNumber}`;
        const parsed = parsePhoneNumberWithError(fullNumber);

        return parsed?.isValid() ?? false;
    } catch {
        return false;
    }
};
