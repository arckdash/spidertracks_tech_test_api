import express, { Router, Request, Response } from 'express';
import { constants as ResponseStatusCode } from 'http2';
import BaseRequest from '../requests/base.request';
import { validationResult } from 'express-validator';

export type TEndpoint = {
    endpoint: string;
    method: 'get' | 'post' | 'put' | 'delete';
    requestValidation: BaseRequest | null;
    endpointHandler: (req: Request) => Promise<TControllerResponse>;
};

export type TControllerResponse = {
    result: boolean;
    data: Object | null;
    message: string;
};

abstract class BaseController {
    /**
     * @property path: string
     */
    protected path: string;

    /**
     * @property router: Router
     */
    protected router: Router;

    /**
     * Base controller, it encapsulates all desired common behaviour across all controllers.
     *
     * @param resourcePath
     * @param requireAuth
     */
    constructor(resourcePath?: string) {
        const rootPath = '/api';
        this.path = !resourcePath ? rootPath : `/api/${resourcePath}`;

        this.router = express.Router();

        this.loadRoutes();
    }

    private loadRoutes(): void {
        const defaultMiddleware = (req: Request, res: Response, next: () => void) => next();

        for (const route of this.getControllerRoutes()) {
            this.router[route.method](
                route.endpoint,
                route.requestValidation ? route.requestValidation.validate() : defaultMiddleware,
                this.endpointHandlerTemplate(route.endpointHandler, route.requestValidation ? true : false),
            );
        }
    }

    private endpointHandlerTemplate(
        endpointHandler: (req: Request) => Promise<TControllerResponse>,
        hasRequestValidation: boolean,
    ) {
        return async (req: Request, res: Response) => {
            if (hasRequestValidation) {
                const reqValidationResult = validationResult(req);
                if (!reqValidationResult.isEmpty()) {
                    console.log('Validation Error: ', reqValidationResult.array());
                    return res
                        .status(ResponseStatusCode.HTTP_STATUS_UNPROCESSABLE_ENTITY)
                        .json({ errors: reqValidationResult.array() });
                }

                const processResult = await endpointHandler(req);
                const { result, data, message } = processResult;

                return res
                    .status(
                        result
                            ? ResponseStatusCode.HTTP_STATUS_OK
                            : ResponseStatusCode.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                    )
                    .json({
                        data,
                        message,
                    });
            }
        };
    }

    /**
     * Allows to each controller to define its own endpoints configuration
     * while keeping common logic abstracted in this class.
     */
    protected abstract getControllerRoutes(): TEndpoint[];
}

export default BaseController;
