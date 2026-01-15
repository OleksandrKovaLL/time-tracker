export const PROJECTS = [
    'Viso Internal',
    'Client A',
    'Client B',
    'Personal Development',
    'Research',
] as const;

export const TIME_INPUT_EXAMPLES = [
    { input: '1,30', output: '1h 30m' },
    { input: '2', output: '2h' },
    { input: '0,45', output: '45m' },
] as const;

export const MIN_HOURS = 0.1;