import { CUSTOMER_STATUS, Prisma } from '@prisma/client';
import BaseService, { TServiceResponse } from '../baseService';
import CustomerRepository from '../../repositories/customer.repository';
import { autoInjectable } from 'tsyringe';

type TCustomer = {
    uuid: string;
    firstName: string;
    lastName: string;
    status: CUSTOMER_STATUS;
    email: string;
    phoneNo: string;
};

@autoInjectable()
class GetCustomerService extends BaseService {
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
        const { uuid } = payload;
        const dataToFetch: Prisma.CustomerSelect = {
            uuid: true,
            firstName: true,
            lastName: true,
            status: true,
            email: true,
            phoneNo: true,
        };

        const customerData = (await this.customerRepository.getCustomer(dataToFetch, {
            uuid,
        })) as TCustomer | null | undefined;

        if (customerData) {
            return {
                data: customerData,
                message: 'Customer fetched successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Customer could not be fetched.',
            result: false,
        };
    }
}

export default GetCustomerService;
