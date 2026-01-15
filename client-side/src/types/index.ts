export interface TimeEntry {
    id: string;
    date: string;
    project: string;
    hours: number;
    description: string;
    createdAt: string;
}

export interface CreateTimeEntryDto {
    date: string;
    project: string;
    hours: number;
    description: string;
}

export interface GroupedEntries {
    [date: string]: TimeEntry[];
}