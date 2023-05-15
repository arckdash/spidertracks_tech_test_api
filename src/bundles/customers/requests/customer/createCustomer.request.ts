import { body } from 'express-validator';
import { CUSTOMER_STATUS } from '@prisma/client';
import BaseRequest from '../base.request';

class CreateCustomerRequest extends BaseRequest {
    public validate() {
        return [
            body('firstName').notEmpty().isString().trim().escape(),
            body('lastName').optional().isString().trim().escape(),
            body('phoneNo').optional().isString().trim().escape(),
            body('email').notEmpty().isString().trim().isEmail().escape(),
            body('status').notEmpty().isString().trim().isIn(Object.values(CUSTOMER_STATUS)),
        ];
    }
}

export default CreateCustomerRequest;
