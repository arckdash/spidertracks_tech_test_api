import { Prisma } from '@prisma/client';
import BaseRepository from './base.repository';

class SaleOpportunityRepository extends BaseRepository {
    constructor() {
        super();
    }

    public async getSaleOpporunities(
        dataToSelect: Prisma.SaleOpportunitySelect,
        flters: Prisma.SaleOpportunityWhereInput,
    ) {
        try {
            return await this.prisma.saleOpportunity.findMany({
                select: dataToSelect,
                where: flters,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            return err;
        }
    }

    public async getSaleOpporunity(
        dataToFetch: Prisma.SaleOpportunitySelect,
        filters: Prisma.SaleOpportunityWhereUniqueInput,
    ) {
        try {
            return await this.prisma.saleOpportunity.findFirst({
                select: dataToFetch,
                where: filters,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            console.log('err: ', err);
        }
    }

    public async createSaleOpporunity(
        dataToFetch: Prisma.SaleOpportunitySelect,
        data: Prisma.SaleOpportunityCreateInput,
    ) {
        try {
            return await this.prisma.saleOpportunity.create({
                data,
                select: dataToFetch,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            console.log('err: ', err);
        }
    }

    public async updateSaleOpporunity(
        data: Prisma.SaleOpportunityUpdateInput,
        dataToFetch: Prisma.SaleOpportunitySelect,
        filters: Prisma.SaleOpportunityWhereUniqueInput,
    ) {
        try {
            return await this.prisma.saleOpportunity.update({
                data,
                select: dataToFetch,
                where: filters,
            });
        } catch (err) {
            await this.prisma.$disconnect();
            console.log('err: ', err);
        }
    }

    public async deleteSaleOpporunity(filters: Prisma.SaleOpportunityWhereUniqueInput) {
        try {
            return await this.prisma.saleOpportunity.delete({
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

export default SaleOpportunityRepository;
