import { CUSTOMER_STATUS, Prisma } from '@prisma/client';
import BaseService, { TServiceResponse } from '../baseService';
import { autoInjectable } from 'tsyringe';
import CustomerRepository from '../../repositories/customer.repository';

type TCustomer = {
    uuid: string;
    firstName: string;
    lastName: string;
    status: CUSTOMER_STATUS;
    email: string;
    phoneNo: string;
};

@autoInjectable()
class CreateCustomerService extends BaseService {
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

    public async process(payload: {
        firstName: string;
        lastName: string;
        status: CUSTOMER_STATUS;
        email: string;
        phoneNo: string;
    }): Promise<TServiceResponse> {
        const dataToFetch: Prisma.CustomerSelect = {
            uuid: true,
            firstName: true,
            lastName: true,
            status: true,
            email: true,
            phoneNo: true,
        };

        // @NOTE: same user id can be used across different organisations.
        // Fetching user org data for a specific organisation.
        const customerData = (await this.customerRepository.createCustomer(dataToFetch, payload)) as
            | TCustomer
            | null
            | undefined;

        if (customerData) {
            return {
                data: customerData,
                message: 'Customer created successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Customer could not be created.',
            result: false,
        };
    }
}

export default CreateCustomerService;
