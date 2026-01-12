import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {getCountryData} from '../../data/countries';
import {Input} from '../components/Input';
import {Select} from '../components/Select';
import {phoneInputSchema} from './schema';
import type {NormalizedPhoneNumber} from './types';

export const PhoneInput = ({
    onSubmit,
}: {
    onSubmit: (data: NormalizedPhoneNumber) => void;
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
            <div className='flex gap-2'>
                <Select {...register('countryCode')} id='countryCode'>
                    <Options />
                </Select>
                <Input
                    {...register('phoneNumber')}
                    id='phoneNumber'
                    type='tel'
                    inputMode='tel'
                    autoComplete='tel-national'
                    aria-label='Phone number'
                    pattern='[0-9]*'
                    maxLength={15}
                />
            </div>
            <button type='submit' className='sr-only' aria-label='Submit'>
                Submit
            </button>
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
