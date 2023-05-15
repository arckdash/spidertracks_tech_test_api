import { Request } from 'express';
import { autoInjectable } from 'tsyringe';
import BaseController, { TControllerResponse, TEndpoint } from './base.controller';
import CreateCustomerRequest from '../requests/customer/createCustomer.request';
import GetCustomersRequest from '../requests/customer/getCustomers.request';
import GetCustomerRequest from '../requests/customer/getCustomer.request';
import UpdateCustomerRequest from '../requests/customer/updateCustomer.request';
import DeleteCustomerRequest from '../requests/customer/deleteCustomer.request';
import { matchedData } from 'express-validator';
import GetCustomersService from '../services/customer/getCustomers.service';
import GetCustomerService from '../services/customer/getCustomer.service';
import CreateCustomerService from '../services/customer/createCustomer.service';
import UpdateCustomerService from '../services/customer/updateCustomer.service';
import DeleteCustomerService from '../services/customer/deleteCustomer.service';

@autoInjectable()
class CustomerController extends BaseController {
    /**
     * @property getCustomersService GetCustomersService
     */
    private getCustomersService: GetCustomersService;

    /**
     * @property getCustomerService GetCustomerService
     */
    private getCustomerService: GetCustomerService;

    /**
     * @property createCustomerService CreateCustomerService
     */
    private createCustomerService: CreateCustomerService;

    /**
     * @property updateCustomerService UpdateCustomerService
     */
    private updateCustomerService: UpdateCustomerService;

    /**
     * @property deleteCustomerService DeleteCustomerService
     */
    private deleteCustomerService: DeleteCustomerService;

    /**
     * @param getCustomersService getCustomersService
     * @param getCustomerService GetCustomerService;
     * @param createCustomerService CreateCustomerService
     * @param updateCustomerService UpdateCustomerService
     * @param deleteCustomerService DeleteCustomerService
     */
    constructor(
        getCustomersService: GetCustomersService,
        getCustomerService: GetCustomerService,
        createCustomerService: CreateCustomerService,
        updateCustomerService: UpdateCustomerService,
        deleteCustomerService: DeleteCustomerService,
    ) {
        const resourcePath = 'customers';
        super(resourcePath);
        this.getCustomersService = getCustomersService;
        this.getCustomerService = getCustomerService;
        this.createCustomerService = createCustomerService;
        this.updateCustomerService = updateCustomerService;
        this.deleteCustomerService = deleteCustomerService;
    }

    protected getControllerRoutes(): TEndpoint[] {
        return [
            {
                endpoint: '',
                method: 'get',
                requestValidation: new GetCustomersRequest(),
                endpointHandler: this.getCustomers.bind(this),
            },
            {
                endpoint: '',
                method: 'get',
                requestValidation: new GetCustomerRequest(),
                endpointHandler: this.getCustomer.bind(this),
            },
            {
                endpoint: '',
                method: 'post',
                requestValidation: new CreateCustomerRequest(),
                endpointHandler: this.createCustomer.bind(this),
            },
            {
                endpoint: '',
                method: 'put',
                requestValidation: new UpdateCustomerRequest(),
                endpointHandler: this.updateCustomer.bind(this),
            },
            {
                endpoint: '',
                method: 'delete',
                requestValidation: new DeleteCustomerRequest(),
                endpointHandler: this.deleteCustomer.bind(this),
            },
        ];
    }

    /**
     * @param req Request
     */
    private async getCustomers(req: Request): Promise<TControllerResponse> {
        const { firstName, lastName } = matchedData(req, {
            locations: ['query'],
        });

        return await this.getCustomersService.exec(
            {
                firstName,
                lastName,
            },
            [],
        );
    }

    /**
     * @param req Request
     */
    private async getCustomer(req: Request): Promise<TControllerResponse> {
        const { uuid } = matchedData(req, {
            locations: ['query'],
        });

        return await this.getCustomerService.exec(
            {
                uuid,
            },
            [],
        );
    }

    /**
     * @param req Request
     */
    private async createCustomer(req: Request): Promise<TControllerResponse> {
        const { firstName, lastName, phoneNo, email, status } = matchedData(req, {
            locations: ['body'],
        });

        return await this.createCustomerService.exec(
            {
                firstName,
                lastName,
                phoneNo,
                email,
                status,
            },
            [],
        );
    }

    /**
     * @param req Request
     */
    private async updateCustomer(req: Request): Promise<TControllerResponse> {
        const { uuid, firstName, lastName, phoneNo, email, status } = matchedData(req, {
            locations: ['body'],
        });

        return await this.updateCustomerService.exec(
            {
                uuid,
                firstName,
                lastName,
                phoneNo,
                email,
                status,
            },
            [],
        );
    }

    /**
     * @param req Request
     */
    private async deleteCustomer(req: Request): Promise<TControllerResponse> {
        const { uuid } = matchedData(req, {
            locations: ['body'],
        });

        return await this.deleteCustomerService.exec(
            {
                uuid,
            },
            [],
        );
    }
}

export default CustomerController;
