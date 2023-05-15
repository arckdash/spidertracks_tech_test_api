import BaseService, { TServiceResponse } from '../baseService';
import { autoInjectable } from 'tsyringe';
import SaleOpportunityRepository from '../../repositories/saleOpportunity.repository';

@autoInjectable()
class DeleteSaleOpportunityService extends BaseService {
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

        const saleOpportunityData = (await this.saleOpportunityRepository.deleteSaleOpporunity({
            uuid,
        })) as { uuid: string } | null | undefined;

        if (saleOpportunityData) {
            return {
                data: saleOpportunityData,
                message: 'Sale opportunity delete successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Sale opportunity could not be delete.',
            result: false,
        };
    }
}

export default DeleteSaleOpportunityService;
