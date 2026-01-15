'use client';

import { TimeEntry } from '@/types';
import { calculateDayTotal, formatHours } from '@/lib/utils';
import TimeEntryItem from './TimeEntryItem';

interface DayEntriesGroupProps {
    date: string;
    entries: TimeEntry[];
    onDelete: (id: string) => Promise<void>;
}

export default function DayEntriesGroup({ date, entries, onDelete }: DayEntriesGroupProps) {
    const dayTotal = calculateDayTotal(entries);

    return (
        <div className="border-b pb-4 last:border-b-0">
            {/* Date Header */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-700">{date}</h3>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Day Total: {formatHours(dayTotal)}
        </span>
            </div>

            {/* Entries for this day */}
            <div className="space-y-2">
                {entries.map((entry) => (
                    <TimeEntryItem key={entry.id} entry={entry} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
}