export const StepIndicator = ({
    currentStep,
}: {
    currentStep: VerificationStep;
}) => (
    <div className='mb-4 sm:mb-6'>
        <div className='flex items-center justify-between'>
            <Step
                title='Selfie'
                number={1}
                isSelected={currentStep === 'selfie'}
            />
            <Separator />
            <Step
                title='Phone'
                number={2}
                isSelected={currentStep === 'phone'}
            />
            <Separator />
            <Step
                title='Address'
                number={3}
                isSelected={currentStep === 'address'}
            />
        </div>
    </div>
);

const Step = ({
    number,
    title,
    isSelected,
}: {
    number: number;
    title: string;
    isSelected: boolean;
}) => (
    <div className='flex items-center gap-1 sm:gap-2'>
        <div
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                isSelected
                    ? 'bg-amber-400 text-black'
                    : 'bg-gray-200 text-gray-600'
            }`}>
            {number}
        </div>
        <span className='text-xs sm:text-sm font-medium hidden sm:inline'>
            {title}
        </span>
    </div>
);

const Separator = () => (
    <div className='flex-1 h-px bg-gray-200 mx-2 sm:mx-4' />
);

type VerificationStep = 'selfie' | 'phone' | 'address';
