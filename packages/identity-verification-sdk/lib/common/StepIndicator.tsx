export type ModuleType = 'selfie' | 'phone' | 'address';

export interface ModuleConfig {
    module: ModuleType;
}

const moduleLabels: Record<ModuleType, string> = {
    selfie: 'Selfie',
    phone: 'Phone',
    address: 'Address',
};

export const StepIndicator = ({
    flowConfig,
    currentModule,
}: {
    flowConfig: ModuleConfig[];
    currentModule: ModuleType;
}) => (
    <div className='mb-4 sm:mb-6'>
        <div className='flex items-center justify-between'>
            {flowConfig.map((config, index) => (
                <div key={config.module} className='contents'>
                    <Step
                        title={moduleLabels[config.module]}
                        number={index + 1}
                        isSelected={currentModule === config.module}
                    />
                    {index < flowConfig.length - 1 && <Separator />}
                </div>
            ))}
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
