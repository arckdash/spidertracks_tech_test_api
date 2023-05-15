import { query } from 'express-validator';
import BaseRequest from '../base.request';
import { CUSTOMER_STATUS } from '@prisma/client';

class GetCustomersRequest extends BaseRequest {
    public validate() {
        return [
            query('firstName').optional().isString().trim().escape(),
            query('lastName').optional().isString().trim().escape(),
            query('email').optional().isString().trim().isEmail().escape(),
            query('status').optional().isString().trim().isIn(Object.values(CUSTOMER_STATUS)),
        ];
    }
}

export default GetCustomersRequest;
