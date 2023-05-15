import { SALE_OPPORTUNITY_STATUS, Prisma } from '@prisma/client';
import BaseService, { TServiceResponse } from '../baseService';
import { autoInjectable } from 'tsyringe';
import SaleOpportunityRepository from '../../repositories/saleOpportunity.repository';

type TSaleOpportunity = {
    uuid: string;
    name: string;
    status: SALE_OPPORTUNITY_STATUS;
    customer: {
        uuid: string;
        firstName: string;
        lastName: string;
    };
};

@autoInjectable()
class GetSaleOpportunitiesService extends BaseService {
    /**
     * @property saleOpportunityRepository SaleOpportunityRepository
     */
    private saleOpportunityRepository: SaleOpportunityRepository;

    /**
     *
     * @param saleOpportunityRepository SaleOpportunityRepository
     */
    constructor(saleOpportunityRepository: SaleOpportunityRepository) {
        super();
        this.saleOpportunityRepository = saleOpportunityRepository;
    }

    public async process(payload: { name: string; status: SALE_OPPORTUNITY_STATUS }): Promise<TServiceResponse> {
        const { name, status } = payload;

        const dataToFetch: Prisma.SaleOpportunitySelect = {
            uuid: true,
            name: true,
            status: true,
            customer: {
                select: {
                    uuid: true,
                    firstName: true,
                    lastName: true,
                },
            },
        };

        const saleOpportunityData = (await this.saleOpportunityRepository.getSaleOpporunities(dataToFetch, {
            AND: {
                ...(name && { name }),
                ...(status && { status }),
            },
        })) as TSaleOpportunity[] | null | undefined;

        if (saleOpportunityData) {
            return {
                data: saleOpportunityData,
                message: 'Sale opportunities fetched successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Sale opportunities could not be fetched.',
            result: false,
        };
    }
}

export default GetSaleOpportunitiesService;
