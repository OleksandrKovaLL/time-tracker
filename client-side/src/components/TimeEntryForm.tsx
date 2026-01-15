'use client';

import { CreateTimeEntryDto } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTimeInput } from '@/hooks/useTimeInput';
import { useTimeEntryForm } from '@/hooks/useTimeEntryForm';
import {MIN_HOURS, PROJECTS} from '@/lib/constants';
import TimeInput from './TimeInput';

interface TimeEntryFormProps {
    onSubmit: (data: CreateTimeEntryDto) => Promise<void>;
    isLoading: boolean;
}

export default function TimeEntryForm({ onSubmit, isLoading }: TimeEntryFormProps) {
    const timeInput = useTimeInput('1');
    const form = useTimeEntryForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const hours = timeInput.getCurrentHours();

        if (hours < MIN_HOURS) return;

        await onSubmit({
            ...form.formData,
            hours,
        });

        // Reset form
        form.reset();
        timeInput.reset();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Add Time Entry</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date with Calendar */}
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !form.date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {form.date ? format(form.date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={form.date}
                                    onSelect={(date) => date && form.setDate(date)}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Project */}
                    <div className="space-y-2">
                        <Label htmlFor="project">Project</Label>
                        <Select value={form.formData.project} onValueChange={form.setProject}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a project" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROJECTS.map((project) => (
                                    <SelectItem key={project} value={project}>
                                        {project}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Time Input */}
                    <TimeInput
                        value={timeInput.input}
                        onChange={timeInput.setInput}
                        currentHours={timeInput.getCurrentHours()}
                    />

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Work Description</Label>
                        <Textarea
                            id="description"
                            rows={4}
                            value={form.formData.description}
                            onChange={(e) => form.setDescription(e.target.value)}
                            placeholder="Describe what you worked on..."
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading || timeInput.getCurrentHours() < 0.1}
                        className="w-full cursor-pointer"
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}