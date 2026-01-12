import z from 'zod';
import {formatPhoneToE164, isValidPhoneNumber} from './utils';

export const phoneInputSchema = z
    .object({
        countryCode: z.string().min(1, 'Country code is required'),
        phoneNumber: z
            .string()
            .trim()
            .min(1, 'Phone number is required')
            .regex(/^\d+$/, 'Phone number must contain only digits'),
    })
    .refine(
        (data) => {
            return isValidPhoneNumber(data.countryCode, data.phoneNumber);
        },
        {
            message: 'Invalid phone number',
            path: ['phoneNumber'],
        }
    )
    .transform((data) => {
        return formatPhoneToE164(data);
    });
