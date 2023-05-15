import express, { Application } from 'express';

type ApiConfigs = {
    port: number;
    middlewares: any;
    controllers: any[];
};

class ApiServer {
    /**
     * @property app Application
     */
    public app: Application;

    /**
     * @property port number
     */
    public port: number;

    /**
     * @param apiConfigs ApiConfigs
     */
    constructor(apiConfigs: ApiConfigs) {
        this.app = express();
        this.port = apiConfigs.port;

        this.middlewares(apiConfigs.middlewares);
        this.routes(apiConfigs.controllers);
    }

    public getExpressAppInstance() {
        return this.app;
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Api has started on port ${this.port}`);
        });
    }

    private routes(controllers: any[]) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    private middlewares(middlewares: any[]) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
}

export default ApiServer;
