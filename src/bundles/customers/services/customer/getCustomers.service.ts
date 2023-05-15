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
class GetCustomersService extends BaseService {
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
        const { firstName, lastName, status, email, phoneNo } = payload;
        const dataToFetch: Prisma.CustomerSelect = {
            uuid: true,
            firstName: true,
            lastName: true,
            status: true,
            email: true,
            phoneNo: true,
        };

        const customerData = (await this.customerRepository.getCustomers(dataToFetch, {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(status && { status }),
            ...(email && { email }),
            ...(phoneNo && { phoneNo }),
        })) as TCustomer[] | null | undefined;

        if (customerData) {
            return {
                data: customerData,
                message: 'Customers fetched successfully.',
                result: true,
            };
        }

        return {
            data: null,
            message: 'Customers could not be fetched.',
            result: false,
        };
    }
}

export default GetCustomersService;
