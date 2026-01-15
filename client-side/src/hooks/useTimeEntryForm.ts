import { useState } from 'react';
import { CreateTimeEntryDto } from '@/types';
import { formatDateForInput } from '@/lib/utils';
import { PROJECTS } from '@/lib/constants';

interface FormState {
    date: Date;
    formData: Omit<CreateTimeEntryDto, 'hours'>;
}

const getInitialState = (): FormState => ({
    date: new Date(),
    formData: {
        date: formatDateForInput(new Date()),
        project: PROJECTS[0],
        description: '',
    },
});

export function useTimeEntryForm() {
    const [state, setState] = useState<FormState>(getInitialState());

    const setDate = (newDate: Date) => {
        setState((prev) => ({
            ...prev,
            date: newDate,
            formData: {
                ...prev.formData,
                date: formatDateForInput(newDate),
            },
        }));
    };

    const setProject = (project: string) => {
        setState((prev) => ({
            ...prev,
            formData: {
                ...prev.formData,
                project,
            },
        }));
    };

    const setDescription = (description: string) => {
        setState((prev) => ({
            ...prev,
            formData: {
                ...prev.formData,
                description,
            },
        }));
    };

    const reset = () => {
        setState(getInitialState());
    };

    return {
        date: state.date,
        formData: state.formData,
        setDate,
        setProject,
        setDescription,
        reset,
    };
}