/**
 * @middleware BusinessRulesMiddleware
 */
class BusinessRulesMiddleware {
    validate(businesRules: BaseBusinessRule[]) {
        for (const rule of businesRules) {
            if (!rule.validate()) {
                throw new Error('Business rule not satisfied.');
            }
        }

        console.log('All business rules satisfied.');
        return true;
    }
}

export default BusinessRulesMiddleware;
