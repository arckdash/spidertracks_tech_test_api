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
class UpdateCustomerService extends BaseService {
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
        uuid: string;
        firstName: string;
        lastName: string;
        status: CUSTOMER_STATUS;
        email: string;
        phoneNo: string;
    }): Promise<TServiceResponse> {
        const { uuid, firstName, lastName, status, email, phoneNo } = payload;
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
        const customerData = (await this.customerRepository.updateCustomer(
            {
                firstName,
                lastName,
                status,
                email,
                phoneNo,
            },
            dataToFetch,
            {
                uuid,
            },
        )) as TCustomer | null | undefined;

        if (customerData) {
            return {
                data: customerData,
                message: 'Customer updated successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Customer could not be updated.',
            result: false,
        };
    }
}

export default UpdateCustomerService;
