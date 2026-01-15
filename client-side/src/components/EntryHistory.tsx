import { TimeEntry } from '@/types';
import { groupEntriesByDate, calculateGrandTotal, formatHours } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import DayEntriesGroup from './DayEntriesGroup';

interface EntryHistoryProps {
    entries: TimeEntry[];
    onDelete: (id: string) => Promise<void>;
}

export default function EntryHistory({ entries, onDelete }: EntryHistoryProps) {
    const groupedEntries = groupEntriesByDate(entries);
    const grandTotal = calculateGrandTotal(entries);

    if (entries.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Entry History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500">No entries yet. Start tracking your time!</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Entry History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {Object.entries(groupedEntries).map(([date, dayEntries]) => (
                        <DayEntriesGroup
                            key={date}
                            date={date}
                            entries={dayEntries}
                            onDelete={onDelete}
                        />
                    ))}
                </div>

                {/* Grand Total */}
                <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                        <span className="text-lg font-bold text-gray-800">Grand Total:</span>
                        <span className="text-2xl font-bold text-blue-600">{formatHours(grandTotal)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}