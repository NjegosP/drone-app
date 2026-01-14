import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {getCountryData} from '../../data/countries';
import {Select, Input} from '../../common';
import {phoneInputSchema} from './schema';
import type {NormalizedPhoneNumber} from './types';

export const PhoneInput = ({
    onSubmit,
    submitButtonRef,
}: {
    onSubmit: (data: NormalizedPhoneNumber) => void;
    submitButtonRef?: React.RefObject<HTMLButtonElement | null>;
}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(phoneInputSchema),
        defaultValues: {
            countryCode: '+1',
            phoneNumber: '',
        },
    });

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-2 w-full max-w-md'>
                <Select
                    className='flex-1 text-lg'
                    {...register('countryCode')}
                    id='countryCode'>
                    <Options />
                </Select>
                <Input
                    {...register('phoneNumber')}
                    className='flex-2 px-2'
                    id='phoneNumber'
                    type='tel'
                    inputMode='tel'
                    autoComplete='tel-national'
                    aria-label='Phone number'
                    pattern='[0-9]*'
                    maxLength={15}
                    error={!!errors?.phoneNumber}
                />
                <button
                    ref={submitButtonRef}
                    type='submit'
                    className='sr-only'
                    aria-label='Submit'>
                    Submit
                </button>
            </div>
        </form>
    );
};

const Options = () => {
    const countries = getCountryData();

    return countries.map(({code, dialCode, flag}) => {
        return (
            <option
                key={code}
                aria-label={code}
                value={dialCode}>{`${flag} ${dialCode}`}</option>
        );
    });
};
