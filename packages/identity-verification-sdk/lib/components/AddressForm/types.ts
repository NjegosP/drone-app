import type z from 'zod';
import type {addressFormSchema} from './schema';

export type AddressFormType = z.infer<typeof addressFormSchema>;
