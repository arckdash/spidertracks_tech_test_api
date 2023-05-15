import { SALE_OPPORTUNITY_STATUS, Prisma } from '@prisma/client';
import BaseService, { TServiceResponse } from '../baseService';
import { autoInjectable } from 'tsyringe';
import SaleOpportunityRepository from '../../repositories/saleOpportunity.repository';

type TSaleOpportunity = {
    uuid: string;
    name: string;
    status: SALE_OPPORTUNITY_STATUS;
};

@autoInjectable()
class GetSaleOpportunityService extends BaseService {
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

    public async process(payload: { uuid: string }): Promise<TServiceResponse> {
        const { uuid } = payload;

        const dataToFetch: Prisma.SaleOpportunitySelect = {
            uuid: true,
            name: true,
            status: true,
        };

        const saleOpportunityData = (await this.saleOpportunityRepository.getSaleOpporunity(dataToFetch, {
            uuid,
        })) as TSaleOpportunity | null | undefined;

        if (saleOpportunityData) {
            return {
                data: saleOpportunityData,
                message: 'Sale opportunity fetched successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Sale opportunity could not be fetched.',
            result: false,
        };
    }
}

export default GetSaleOpportunityService;
