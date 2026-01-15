import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';

@Injectable()
export class TimeEntriesService {
  constructor(private prisma: PrismaService) {}

  async create(createTimeEntryDto: CreateTimeEntryDto) {
    const { date, hours } = createTimeEntryDto;

    // Перевірка: максимум 24 години на одну дату
    const dateObj = new Date(date);
    const startOfDay = new Date(dateObj);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(dateObj);
    endOfDay.setHours(23, 59, 59, 999);

    // Знайти всі записи за цю дату
    const existingEntries = await this.prisma.timeEntry.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    // Порахувати загальну кількість годин
    const totalHours = existingEntries.reduce((sum, entry) => sum + entry.hours, 0);

    // Перевірити що не перевищуємо 24 години
    if (totalHours + hours > 24) {
      throw new BadRequestException(
          `Cannot add ${hours} hours. Total would exceed 24 hours for ${dateObj.toLocaleDateString()}. Current total: ${totalHours} hours.`
      );
    }

    // Створити запис
    return this.prisma.timeEntry.create({
      data: {
        ...createTimeEntryDto,
        date: dateObj,
      },
    });
  }

  async findAll() {
    return this.prisma.timeEntry.findMany({
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.timeEntry.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTimeEntryDto: UpdateTimeEntryDto) {
    return this.prisma.timeEntry.update({
      where: { id },
      data: updateTimeEntryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.timeEntry.delete({
      where: { id },
    });
  }
}