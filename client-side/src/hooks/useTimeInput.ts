import { useState } from 'react';
import { parseTimeInput, clampHours, isValidTimeInput } from '@/lib/utils';

export function useTimeInput(initialValue: string = '1') {
    const [input, setInput] = useState<string>(initialValue);

    const handleChange = (value: string) => {
        if (isValidTimeInput(value)) {
            setInput(value);
        }
    };

    const getCurrentHours = (): number => {
        const parsed = parseTimeInput(input);
        return clampHours(parsed, 24);
    };

    const reset = (value: string = '1') => {
        setInput(value);
    };

    return {
        input,
        setInput: handleChange,
        getCurrentHours,
        reset,
    };
}