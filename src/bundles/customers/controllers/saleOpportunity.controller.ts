import { Request } from 'express';
import { matchedData } from 'express-validator';
import { autoInjectable } from 'tsyringe';
import BaseController, { TControllerResponse, TEndpoint } from './base.controller';
import GetSaleOpportunitiesService from '../services/saleOpportunity/getSaleOpportunities.service';
import GetSaleOpportunityService from '../services/saleOpportunity/getSaleOpportunity.service';
import CreateSaleOpportunityService from '../services/saleOpportunity/createSaleOpportunity.service';
import UpdateSaleOpportunityService from '../services/saleOpportunity/updateSaleOpportunity.service';
import DeleteSaleOpportunityService from '../services/saleOpportunity/deleteSaleOpportunity.service';
import GetSaleOpportunitiesRequest from '../requests/saleOpportunity/getSaleOpportunities.request';
import GetSaleOpportunityRequest from '../requests/saleOpportunity/getSaleOpportunity.request';
import CreateSaleOpportunityRequest from '../requests/saleOpportunity/createSaleOpportunity.request';
import UpdateSaleOpportunityRequest from '../requests/saleOpportunity/updateSaleOpportunity.request';
import DeleteSaleOpportunityRequest from '../requests/saleOpportunity/deleteSaleOpportunity.request';

@autoInjectable()
class SaleOpportunityController extends BaseController {
    /**
     * @property getSaleOpportunitysService GetSaleOpportunitysService
     */
    private getSaleOpportunitiesService: GetSaleOpportunitiesService;

    /**
     * @property getSaleOpportunityService GetSaleOpportunityService
     */
    private getSaleOpportunityService: GetSaleOpportunityService;

    /**
     * @property createSaleOpportunityService CreateSaleOpportunityService
     */
    private createSaleOpportunityService: CreateSaleOpportunityService;

    /**
     * @property updateSaleOpportunityService UpdateSaleOpportunityService
     */
    private updateSaleOpportunityService: UpdateSaleOpportunityService;

    /**
     * @property deleteSaleOpportunityService DeleteSaleOpportunityService
     */
    private deleteSaleOpportunityService: DeleteSaleOpportunityService;

    /**
     * @param getSaleOpportunitysService GetSaleOpportunitysService
     * @param getSaleOpportunityService GetSaleOpportunityService
     * @param createSaleOpportunityService CreateSaleOpportunityService
     * @param updateSaleOpportunityService UpdateSaleOpportunityService
     * @param deleteSaleOpportunityService DeleteSaleOpportunityService
     */
    constructor(
        getSaleOpportunitiesService: GetSaleOpportunitiesService,
        getSaleOpportunityService: GetSaleOpportunityService,
        createSaleOpportunityService: CreateSaleOpportunityService,
        updateSaleOpportunityService: UpdateSaleOpportunityService,
        deleteSaleOpportunityService: DeleteSaleOpportunityService,
    ) {
        const resourcePath = 'sales-opportunity';
        super(resourcePath);
        this.getSaleOpportunitiesService = getSaleOpportunitiesService;
        this.getSaleOpportunityService = getSaleOpportunityService;
        this.createSaleOpportunityService = createSaleOpportunityService;
        this.updateSaleOpportunityService = updateSaleOpportunityService;
        this.deleteSaleOpportunityService = deleteSaleOpportunityService;
    }

    protected getControllerRoutes(): TEndpoint[] {
        return [
            {
                endpoint: '',
                method: 'get',
                requestValidation: new GetSaleOpportunitiesRequest(),
                endpointHandler: this.getSaleOpportunitys.bind(this),
            },
            {
                endpoint: '',
                method: 'get',
                requestValidation: new GetSaleOpportunityRequest(),
                endpointHandler: this.getSaleOpportunity.bind(this),
            },
            {
                endpoint: '',
                method: 'post',
                requestValidation: new CreateSaleOpportunityRequest(),
                endpointHandler: this.createSaleOpportunity.bind(this),
            },
            {
                endpoint: '',
                method: 'put',
                requestValidation: new UpdateSaleOpportunityRequest(),
                endpointHandler: this.updateSaleOpportunity.bind(this),
            },
            {
                endpoint: '',
                method: 'delete',
                requestValidation: new DeleteSaleOpportunityRequest(),
                endpointHandler: this.deleteSaleOpportunity.bind(this),
            },
        ];
    }

    /**
     * @param req Request
     */
    private async getSaleOpportunitys(req: Request): Promise<TControllerResponse> {
        const { name, status } = matchedData(req, {
            locations: ['query'],
        });

        return await this.getSaleOpportunitiesService.exec(
            {
                name,
                status,
            },
            [],
        );
    }

    /**
     * @param req Request
     */
    private async getSaleOpportunity(req: Request): Promise<TControllerResponse> {
        const { uuid } = matchedData(req, {
            locations: ['query'],
        });

        return await this.getSaleOpportunityService.exec(
            {
                uuid,
            },
            [],
        );
    }

    /**
     * @param req Request
     */
    private async createSaleOpportunity(req: Request): Promise<TControllerResponse> {
        const { name, status, customerUUID } = matchedData(req, {
            locations: ['body'],
        });

        return await this.createSaleOpportunityService.exec(
            {
                name,
                status,
                customerUUID,
            },
            [],
        );
    }

    /**
     * @param req Request
     */
    private async updateSaleOpportunity(req: Request): Promise<TControllerResponse> {
        const { uuid, name, status, customerUUID } = matchedData(req, {
            locations: ['body'],
        });

        return await this.updateSaleOpportunityService.exec(
            {
                uuid,
                name,
                status,
                customerUUID,
            },
            [],
        );
    }

    /**
     * @param req Request
     */
    private async deleteSaleOpportunity(req: Request): Promise<TControllerResponse> {
        const { uuid } = matchedData(req, {
            locations: ['query'],
        });

        return await this.deleteSaleOpportunityService.exec(
            {
                uuid,
            },
            [],
        );
    }
}

export default SaleOpportunityController;
