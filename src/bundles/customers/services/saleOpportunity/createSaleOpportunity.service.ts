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
class CreateSaleOpportunityService extends BaseService {
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

    public async process(payload: {
        name: string;
        status: SALE_OPPORTUNITY_STATUS;
        customerUUID: string;
    }): Promise<TServiceResponse> {
        const { name, status, customerUUID } = payload;

        const dataToFetch: Prisma.SaleOpportunitySelect = {
            uuid: true,
            name: true,
            status: true,
        };

        // @NOTE: same user id can be used across different organisations.
        // Fetching user org data for a specific organisation.
        const saleOpportunityData = (await this.saleOpportunityRepository.createSaleOpporunity(dataToFetch, {
            name,
            status,
            customer: {
                connect: {
                    uuid: customerUUID,
                },
            },
        })) as TSaleOpportunity | null | undefined;

        if (saleOpportunityData) {
            return {
                data: saleOpportunityData,
                message: 'Sale opportunity created successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Sale opportunity could not be created.',
            result: false,
        };
    }
}

export default CreateSaleOpportunityService;
