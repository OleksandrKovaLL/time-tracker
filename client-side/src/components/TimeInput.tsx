import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatHours } from '@/lib/utils';
import { TIME_INPUT_EXAMPLES } from '@/lib/constants';

interface TimeInputProps {
    value: string;
    onChange: (value: string) => void;
    currentHours: number;
}

export default function TimeInput({ value, onChange, currentHours }: TimeInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="hours">Time Spent</Label>
            <Input
                id="hours"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="1,30 or 1:30 or 2"
                required
                className="font-mono text-lg"
            />
            <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          Format: 1,30 or 1:30 (hours, minutes) or just 2 (hours)
        </span>
                <span className="font-semibold text-blue-600 text-base">
          = {formatHours(currentHours)}
        </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                {TIME_INPUT_EXAMPLES.map((example) => (
                    <div key={example.input}>
                        <span className="font-mono text-blue-600">{example.input}</span>
                        <span className="text-gray-400"> → {example.output}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}