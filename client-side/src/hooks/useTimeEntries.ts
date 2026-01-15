import { useState, useEffect } from 'react';
import { TimeEntry, CreateTimeEntryDto } from '@/types';
import { timeEntriesApi } from '@/lib/api';
import toast from 'react-hot-toast';

export function useTimeEntries() {
    const [entries, setEntries] = useState<TimeEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const fetchEntries = async () => {
        try {
            setIsFetching(true);
            const data = await timeEntriesApi.getAll();
            setEntries(data);
        } catch (error: any) {
            toast.error('Failed to load entries');
            console.error('Error fetching entries:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const createEntry = async (data: CreateTimeEntryDto) => {
        try {
            setIsLoading(true);
            const newEntry = await timeEntriesApi.create(data);
            setEntries((prev) => [newEntry, ...prev]);
            toast.success('Entry saved successfully! 🎉');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to save entry';
            const errorText = Array.isArray(message) ? message.join(', ') : message;
            toast.error(errorText);
            console.error('Error creating entry:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteEntry = async (id: string) => {
        try {
            await timeEntriesApi.delete(id);
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
            toast.success('Entry deleted successfully! 🗑️');
        } catch (error: any) {
            toast.error('Failed to delete entry');
            console.error('Error deleting entry:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return {
        entries,
        isLoading,
        isFetching,
        createEntry,
        deleteEntry,
        refetch: fetchEntries,
    };
}