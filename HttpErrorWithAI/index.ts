import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as appInsights from 'applicationinsights';
appInsights.setup().start();

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const corrContext = appInsights.startOperation(context, req)!;

    appInsights.wrapWithCorrelationContext(async () => {
        throw new Error('oops');
    }, corrContext);
};

export default httpTrigger;
