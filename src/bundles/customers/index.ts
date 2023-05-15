import { container } from 'tsyringe';

// Controllers
import CustomerController from './controllers/customer.controller';
import SaleOpportunityController from './controllers/saleOpportunity.controller';

// DI
const customerController = container.resolve(CustomerController);
const saleOpportunityController = container.resolve(SaleOpportunityController);

// Middlewares

// Services

export default {
    controllers: [customerController, saleOpportunityController],
    middlewares: [],
    services: [],
};
