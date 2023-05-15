import { query } from 'express-validator';
import BaseRequest from '../base.request';

class DeleteSaleOpportunityRequest extends BaseRequest {
    public validate() {
        return [query('uuid').notEmpty().isString().isUUID()];
    }
}

export default DeleteSaleOpportunityRequest;
