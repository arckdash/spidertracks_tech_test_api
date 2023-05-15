import BusinessRulesMiddleware from '../middlewares/businessRules.middleware';

export type TServiceResponse = {
    result: boolean;
    data: Object | null;
    message: string;
};

abstract class BaseService {
    private businessRulesMiddleware: BusinessRulesMiddleware;

    constructor() {
        this.businessRulesMiddleware = new BusinessRulesMiddleware();
    }

    /**
     * Method, responsible for executing all validators
     * passed to the service.
     *
     * @return boolean
     */
    public async exec(
        payload: any,
        businessRules: BaseBusinessRule[] = [],
        isPostmanRequest: boolean = false,
    ): Promise<TServiceResponse> {
        try {
            // If the validation fails, an exception will be thrown.
            this.businessRulesMiddleware.validate(businessRules);

            return await this.process(payload);
        } catch (error) {
            console.error('Middleware Exception: ', error);
            return {
                result: false,
                message: `Middleware Exception: ${error}`,
                data: null,
            };
        }
    }

    /**
     * Function responsible for implementing business logic.
     * @param payload any
     */
    public abstract process(payload: any): Promise<TServiceResponse>;
}

export default BaseService;
