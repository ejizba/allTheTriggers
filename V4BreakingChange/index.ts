import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (context: Context, _req: HttpRequest): Promise<void> {
    context.res = {
        body: context.bindingData,
    };
};

export default httpTrigger;
