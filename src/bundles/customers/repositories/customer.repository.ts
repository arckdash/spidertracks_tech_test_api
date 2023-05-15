import { Prisma } from '@prisma/client';
import BaseRepository from './base.repository';

class CustomerRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getCustomers(dataToSelect: Prisma.CustomerSelect, filters: Prisma.CustomerWhereInput) {
        try {
            return await this.prisma.customer.findMany({
                select: dataToSelect,
                where: filters,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            return err;
        }
    }

    public async getCustomer(dataToFetch: Prisma.CustomerSelect, filters: Prisma.CustomerWhereUniqueInput) {
        try {
            return await this.prisma.customer.findFirst({
                select: dataToFetch,
                where: filters,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            console.log('err: ', err);
        }
    }

    public async createCustomer(dataToFetch: Prisma.CustomerSelect, data: Prisma.CustomerCreateInput) {
        try {
            return await this.prisma.customer.create({
                data,
                select: dataToFetch,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            console.log('err: ', err);
        }
    }

    public async updateCustomer(
        data: Prisma.CustomerUpdateInput,
        dataToFetch: Prisma.CustomerSelect,
        filters: Prisma.CustomerWhereUniqueInput,
    ) {
        try {
            return await this.prisma.customer.update({
                data,
                select: dataToFetch,
                where: filters,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            console.log('err: ', err);
        }
    }

    public async deleteCustomer(filters: Prisma.CustomerWhereUniqueInput) {
        try {
            return await this.prisma.customer.delete({
                select: {
                    uuid: true,
                },
                where: filters,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            return err;
        }
    }
}

export default CustomerRepository;
