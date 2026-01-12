import z from 'zod';

export const addressFormSchema = z.object({
    streetAddress: z
        .string()
        .trim()
        .min(1, 'Street address is required')
        .max(100, 'Street address is too long'),
    city: z
        .string()
        .trim()
        .min(1, 'City is required')
        .max(50, 'City name is too long'),
    stateProvince: z
        .string()
        .trim()
        .min(1, 'State/Province is required')
        .max(50, 'State/Province is too long'),
    country: z.string().trim().min(1, 'Country is required'),
    zipCode: z
        .string()
        .trim()
        .min(1, 'Zip code is required')
        .max(20, 'Zip code is too long'),
});
