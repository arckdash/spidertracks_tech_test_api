import { ValidationChain } from 'express-validator';

abstract class BaseRequest {
    public abstract validate(): ValidationChain[];
}

export default BaseRequest;
