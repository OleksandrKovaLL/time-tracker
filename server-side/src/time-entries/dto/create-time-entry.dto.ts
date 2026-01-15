import { IsDateString, IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateTimeEntryDto {
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    project: string;

    @IsNumber()
    @Min(0.1, { message: 'Hours must be at least 0.1' })
    @Max(24, { message: 'Hours cannot exceed 24' })
    hours: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}
