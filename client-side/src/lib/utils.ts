import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TimeEntry, GroupedEntries } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupEntriesByDate(entries: TimeEntry[]): GroupedEntries {
  return entries.reduce((acc, entry) => {
    try {
      let dateObj: Date;

      const dateStr = entry.date.split('T')[0];
      const [year, month, day] = dateStr.split('-').map(Number);
      dateObj = new Date(year, month - 1, day);

      if (isNaN(dateObj.getTime())) {
        console.error('Invalid date for entry:', entry);
        return acc;
      }

      const formattedDate = dateObj.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(entry);

    } catch (error) {
      console.error('Error processing entry date:', entry, error);
    }

    return acc;
  }, {} as GroupedEntries);
}

export function calculateDayTotal(entries: TimeEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.hours, 0);
}

export function calculateGrandTotal(entries: TimeEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.hours, 0);
}

export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatHours(hours: number): string {
  if (hours === 0) return '0h';

  const totalMinutes = Math.round(hours * 60);

  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  if (m === 0) return `${h}h`;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

// Parsing time input (supports various formats)
export function parseTimeInput(value: string): number {
  if (!value || value.trim() === '') return 0;

  // If there is a separator (comma, period, colon) - format "hours, minutes"
  if (value.includes(',') || value.includes('.') || value.includes(':')) {
    const separator = value.includes(',') ? ',' : (value.includes('.') ? '.' : ':');
    const parts = value.split(separator);

    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;

    return hours + (minutes / 60);
  }

  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
}

// Validation of the entered time (allows only numbers, periods, commas, colons)
export function isValidTimeInput(value: string): boolean {
  return value === '' || /^[0-9.,:\s]*$/.test(value);
}

// Limit hours to maximum
export function clampHours(hours: number, max: number = 24): number {
  return Math.min(Math.max(hours, 0), max);
}