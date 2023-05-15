import { body } from 'express-validator';
import BaseRequest from '../base.request';
import { SALE_OPPORTUNITY_STATUS } from '@prisma/client';

class UpdateSaleOpportunityRequest extends BaseRequest {
    public validate() {
        return [
            body('uuid').notEmpty().isString().isUUID(),
            body('name').notEmpty().isString().trim().escape(),
            body('status').notEmpty().isString().trim().isIn(Object.values(SALE_OPPORTUNITY_STATUS)),
            body('customerUUID').notEmpty().isString().isUUID(),
        ];
    }
}

export default UpdateSaleOpportunityRequest;
