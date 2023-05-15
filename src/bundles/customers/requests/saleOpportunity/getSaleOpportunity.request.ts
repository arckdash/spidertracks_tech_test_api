import { query } from 'express-validator';
import BaseRequest from '../base.request';

class GetSaleOpportunitiesRequest extends BaseRequest {
    public validate() {
        return [query('uuid').notEmpty().isString().isUUID()];
    }
}

export default GetSaleOpportunitiesRequest;
