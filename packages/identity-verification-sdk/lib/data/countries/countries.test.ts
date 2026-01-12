import {describe, expect, it} from 'vitest';
import {getCountryData} from './countries';

describe('getCountryData', () => {
    it('returns array of countries', () => {
        const countries = getCountryData();

        expect(Array.isArray(countries)).toBe(true);
        expect(countries.length).toBeGreaterThan(0);
    });

    it('returns countries with required properties', () => {
        const countries = getCountryData();
        const firstCountry = countries[0];

        expect(firstCountry).toHaveProperty('code');
        expect(firstCountry).toHaveProperty('dialCode');
        expect(firstCountry).toHaveProperty('flag');
        expect(typeof firstCountry.code).toBe('string');
        expect(typeof firstCountry.dialCode).toBe('string');
        expect(typeof firstCountry.flag).toBe('string');
    });

    it('includes common countries', () => {
        const countries = getCountryData();
        const codes = countries.map((c) => c.code);

        expect(codes).toContain('US');
        expect(codes).toContain('GB');
        expect(codes).toContain('RS');
        expect(codes).toContain('CA');
    });

    it('formats dial codes with + prefix', () => {
        const countries = getCountryData();

        countries.forEach((country) => {
            expect(country.dialCode).toMatch(/^\+\d+$/);
        });
    });

    it('provides unique country codes', () => {
        const countries = getCountryData();
        const codes = countries.map((c) => c.code);
        const uniqueCodes = new Set(codes);

        expect(codes.length).toBe(uniqueCodes.size);
    });

    it('provides unicode flag emojis', () => {
        const countries = getCountryData();

        countries.forEach((country) => {
            expect(country.flag.length).toBeGreaterThan(0);
        });
    });

    it('returns same data on multiple calls', () => {
        const countries1 = getCountryData();
        const countries2 = getCountryData();

        expect(countries1).toEqual(countries2);
    });
});
