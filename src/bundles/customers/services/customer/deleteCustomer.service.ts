import BaseService, { TServiceResponse } from '../baseService';
import CustomerRepository from '../../repositories/customer.repository';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
class DeleteCustomerService extends BaseService {
    /**
     * @property customerRepository CustomerRepository
     */
    private customerRepository: CustomerRepository;

    /**
     *
     * @param customerRepository CustomerRepository
     */
    constructor(customerRepository: CustomerRepository) {
        super();
        this.customerRepository = customerRepository;
    }

    public async process(payload: { uuid: string }): Promise<TServiceResponse> {
        const customerData = (await this.customerRepository.deleteCustomer({
            uuid: payload.uuid,
        })) as { uuid: true } | null | undefined;

        if (customerData) {
            return {
                data: customerData,
                message: 'Customer delete successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Customer could not be deleted.',
            result: false,
        };
    }
}

export default DeleteCustomerService;
