import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';
import {AddressForm} from './AddressForm';

describe('AddressForm', () => {
    it('renders all form fields', () => {
        render(<AddressForm />);

        expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/state\/province/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
    });

    it('shows all fields are required', () => {
        render(<AddressForm />);

        expect(screen.getByText(/street address \*/i)).toBeInTheDocument();
        expect(screen.getByText(/city \*/i)).toBeInTheDocument();
        expect(screen.getByText(/state\/province \*/i)).toBeInTheDocument();
        expect(screen.getByText(/country \*/i)).toBeInTheDocument();
        expect(screen.getByText(/zip code \*/i)).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        const user = userEvent.setup();
        render(<AddressForm />);

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/street address is required/i)
            ).toBeInTheDocument();
            expect(screen.getByText(/city is required/i)).toBeInTheDocument();
            expect(
                screen.getByText(/state\/province is required/i)
            ).toBeInTheDocument();
            expect(screen.getByText(/zip code is required/i)).toBeInTheDocument();
        });
    });

    it('submits form with valid data', async () => {
        const user = userEvent.setup();
        render(<AddressForm />);

        await user.type(
            screen.getByLabelText(/street address/i),
            '123 Main St'
        );
        await user.type(screen.getByLabelText(/city/i), 'New York');
        await user.type(screen.getByLabelText(/state\/province/i), 'NY');
        await user.selectOptions(screen.getByLabelText(/country/i), 'US');
        await user.type(screen.getByLabelText(/zip code/i), '10001');

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.queryByText(/street address is required/i)
            ).not.toBeInTheDocument();
            expect(screen.queryByText(/city is required/i)).not.toBeInTheDocument();
        });
    });

    it('trims whitespace from inputs', async () => {
        const user = userEvent.setup();
        render(<AddressForm />);

        await user.type(
            screen.getByLabelText(/street address/i),
            '  123 Main St  '
        );
        await user.type(screen.getByLabelText(/city/i), '  New York  ');

        await user.type(screen.getByLabelText(/state\/province/i), 'NY');
        await user.selectOptions(screen.getByLabelText(/country/i), 'US');
        await user.type(screen.getByLabelText(/zip code/i), '10001');

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.queryByText(/street address is required/i)
            ).not.toBeInTheDocument();
        });
    });

    it('enforces maxLength constraints', () => {
        render(<AddressForm />);

        const streetAddressInput = screen.getByLabelText(
            /street address/i
        ) as HTMLInputElement;
        const cityInput = screen.getByLabelText(/city/i) as HTMLInputElement;
        const stateInput = screen.getByLabelText(
            /state\/province/i
        ) as HTMLInputElement;
        const zipInput = screen.getByLabelText(/zip code/i) as HTMLInputElement;

        expect(streetAddressInput.maxLength).toBe(100);
        expect(cityInput.maxLength).toBe(50);
        expect(stateInput.maxLength).toBe(50);
        expect(zipInput.maxLength).toBe(20);
    });

    it('has proper autocomplete attributes', () => {
        render(<AddressForm />);

        const streetAddressInput = screen.getByLabelText(
            /street address/i
        ) as HTMLInputElement;
        const cityInput = screen.getByLabelText(/city/i) as HTMLInputElement;
        const stateInput = screen.getByLabelText(
            /state\/province/i
        ) as HTMLInputElement;
        const countrySelect = screen.getByLabelText(/country/i) as HTMLSelectElement;
        const zipInput = screen.getByLabelText(/zip code/i) as HTMLInputElement;

        expect(streetAddressInput.getAttribute('autocomplete')).toBe('street-address');
        expect(cityInput.getAttribute('autocomplete')).toBe('address-level2');
        expect(stateInput.getAttribute('autocomplete')).toBe('address-level1');
        expect(countrySelect.getAttribute('autocomplete')).toBe('country');
        expect(zipInput.getAttribute('autocomplete')).toBe('postal-code');
    });

    it('has aria-describedby linking inputs to errors', async () => {
        const user = userEvent.setup();
        render(<AddressForm />);

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(() => {
            const streetAddressInput = screen.getByLabelText(
                /street address/i
            ) as HTMLInputElement;
            const errorId = streetAddressInput.getAttribute('aria-describedby');
            expect(errorId).toBe('streetAddress-error');

            const errorElement = document.getElementById(errorId!);
            expect(errorElement).toHaveTextContent(
                /street address is required/i
            );
        });
    });

    it('shows visual error state on invalid fields', async () => {
        const user = userEvent.setup();
        render(<AddressForm />);

        const submitButton = screen.getByRole('button', {name: /submit/i});
        await user.click(submitButton);

        await waitFor(() => {
            const streetAddressInput = screen.getByLabelText(
                /street address/i
            ) as HTMLInputElement;
            expect(streetAddressInput.getAttribute('aria-invalid')).toBe('true');
        });
    });

    it('has proper form accessibility attributes', () => {
        render(<AddressForm />);

        const form = screen.getByLabelText('Address information');
        expect(form).toHaveAttribute('aria-label', 'Address information');
        expect(form).toHaveAttribute('novalidate');
    });

    it('shows placeholders for input guidance', () => {
        render(<AddressForm />);

        expect(
            screen.getByPlaceholderText('123 Main St')
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText('New York')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('California')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('12345')).toBeInTheDocument();
    });
});
