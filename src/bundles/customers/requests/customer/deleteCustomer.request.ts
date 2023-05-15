import { query } from 'express-validator';
import BaseRequest from '../base.request';

class DeleteCustomerRequest extends BaseRequest {
    public validate() {
        return [query('uuid').notEmpty().isString().isUUID()];
    }
}

export default DeleteCustomerRequest;
