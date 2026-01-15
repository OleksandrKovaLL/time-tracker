import axios from 'axios';
import { TimeEntry, CreateTimeEntryDto } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const timeEntriesApi = {
    getAll: async (): Promise<TimeEntry[]> => {
        const response = await api.get('/time-entries');
        return response.data;
    },

    create: async (data: CreateTimeEntryDto): Promise<TimeEntry> => {
        const response = await api.post('/time-entries', data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/time-entries/${id}`);
    },
};