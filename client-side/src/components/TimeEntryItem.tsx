'use client';

import { TimeEntry } from '@/types';
import { formatHours } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

interface TimeEntryItemProps {
    entry: TimeEntry;
    onDelete: (id: string) => Promise<void>;
}

export default function TimeEntryItem({ entry, onDelete }: TimeEntryItemProps) {
    return (
        <div className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-800">{entry.project}</span>
                    <span className="text-sm font-medium text-gray-600 bg-white px-2 py-1 rounded">
            {formatHours(entry.hours)}
          </span>
                </div>
                <p className="text-sm text-gray-600">{entry.description}</p>
            </div>

            {/* Delete Button with Confirmation */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-4 cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this time entry.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => onDelete(entry.id)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}