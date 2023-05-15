import { query } from 'express-validator';
import { SALE_OPPORTUNITY_STATUS } from '@prisma/client';
import BaseRequest from '../base.request';

class GetSaleOpportunityRequest extends BaseRequest {
    public validate() {
        return [
            query('name').optional().isString().trim().escape(),
            query('status').optional().isString().trim().isIn(Object.values(SALE_OPPORTUNITY_STATUS)),
        ];
    }
}

export default GetSaleOpportunityRequest;
