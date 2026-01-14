import {zodResolver} from '@hookform/resolvers/zod';
import clsx from 'clsx';
import type React from 'react';
import type {ReactNode} from 'react';
import {useForm} from 'react-hook-form';
import {getCountryData} from '../../data/countries';
import {Input, Label, Select, ValidationError} from '../../common';
import {addressFormSchema} from './schema';
import type {AddressFormType} from './types';

export const AddressForm = ({
    onSubmit,
    submitButtonRef,
}: {
    onSubmit: (data: AddressFormType) => void;
    submitButtonRef?: React.RefObject<HTMLButtonElement | null>;
}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<AddressFormType>({
        resolver: zodResolver(addressFormSchema),
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label='Address information'>
            <div className='flex flex-col gap-2'>
                <InputWrapper>
                    <Label
                        htmlFor='streetAddress'
                        error={!!errors.streetAddress}>
                        Street Address *
                    </Label>
                    <Input
                        {...register('streetAddress')}
                        id='streetAddress'
                        type='text'
                        autoComplete='street-address'
                        placeholder='123 Main St'
                        maxLength={100}
                        error={!!errors.streetAddress}
                        aria-describedby={
                            errors.streetAddress
                                ? 'streetAddress-error'
                                : undefined
                        }
                        required
                    />
                    <ValidationError
                        error={errors.streetAddress}
                        id='streetAddress-error'
                    />
                </InputWrapper>
                <div className='flex gap-2 flex-col md:flex-row'>
                    <InputWrapper className='w-full md:w-1/2'>
                        <Label htmlFor='city' error={!!errors.city}>
                            City *
                        </Label>
                        <Input
                            {...register('city')}
                            id='city'
                            type='text'
                            autoComplete='address-level2'
                            placeholder='New York'
                            maxLength={50}
                            error={!!errors.city}
                            aria-describedby={
                                errors.city ? 'city-error' : undefined
                            }
                            required
                        />
                        <ValidationError error={errors.city} id='city-error' />
                    </InputWrapper>
                    <InputWrapper className='w-full md:w-1/2'>
                        <Label
                            htmlFor='stateProvince'
                            error={!!errors.stateProvince}>
                            State/Province *
                        </Label>
                        <Input
                            {...register('stateProvince')}
                            id='stateProvince'
                            type='text'
                            autoComplete='address-level1'
                            placeholder='California'
                            maxLength={50}
                            error={!!errors.stateProvince}
                            aria-describedby={
                                errors.stateProvince
                                    ? 'stateProvince-error'
                                    : undefined
                            }
                            required
                        />
                        <ValidationError
                            error={errors.stateProvince}
                            id='stateProvince-error'
                        />
                    </InputWrapper>
                </div>
                <div className='flex gap-2 flex-col md:flex-row'>
                    <InputWrapper className='w-full md:w-1/2'>
                        <Label htmlFor='country' error={!!errors.country}>
                            Country *
                        </Label>
                        <Select
                            {...register('country')}
                            id='country'
                            autoComplete='country'
                            error={!!errors.country}
                            aria-describedby={
                                errors.country ? 'country-error' : undefined
                            }
                            required>
                            <CountryOptions />
                        </Select>
                        <ValidationError
                            error={errors.country}
                            id='country-error'
                        />
                    </InputWrapper>
                    <InputWrapper className='w-full md:w-1/2'>
                        <Label htmlFor='zipCode' error={!!errors.zipCode}>
                            Zip Code *
                        </Label>
                        <Input
                            {...register('zipCode')}
                            id='zipCode'
                            type='text'
                            autoComplete='postal-code'
                            placeholder='12345'
                            maxLength={20}
                            error={!!errors.zipCode}
                            aria-describedby={
                                errors.zipCode ? 'zipCode-error' : undefined
                            }
                            required
                        />
                        <ValidationError
                            error={errors.zipCode}
                            id='zipCode-error'
                        />
                    </InputWrapper>
                </div>
            </div>
            <button ref={submitButtonRef} className='sr-only' type='submit'>
                Submit
            </button>
        </form>
    );
};

const InputWrapper: React.FC<{children: ReactNode; className?: string}> = ({
    children,
    className,
}) => (
    <div className={clsx('flex flex-col text-left', className)}>{children}</div>
);

const CountryOptions: React.FC = () => {
    const countryData = getCountryData();
    return countryData.map(({code, countryName}) => (
        <option key={code} value={code}>
            {countryName}
        </option>
    ));
};
