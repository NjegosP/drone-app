import {
    getCountries as _getCountries,
    getCountryCallingCode,
} from 'libphonenumber-js';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

type PhoneCountryData = {
    code: string;
    dialCode: string;
};

export const getCountries = (): PhoneCountryData[] => {
    return _getCountries().map((code) => ({
        code,
        dialCode: `+${getCountryCallingCode(code)}`,
    }));
};

export const getFlagForCountry = (countryCode: string): string => {
    return getUnicodeFlagIcon(countryCode);
};
