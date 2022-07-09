import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    const productsIds = dto.products.map((element) => ({ id: element }));

    const data: Prisma.OrderCreateInput = {
      table: {
        connect: {
          number: dto.tableNumber,
        },
      },
      user: {
        connect: {
          id: dto.userId,
        },
      },
      products: {
        connect: productsIds,
      },
    };

    return this.prisma.order.create({
      data,
      select: {
        id: true,
        createdAt: true,
        tableNumber: true,
        userId: true,
        products: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.order.findMany({
      select: {
        id: true,
        createdAt: true,
        tableNumber: true,
        userId: true,
        products: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
