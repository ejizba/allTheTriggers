import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (_context: Context, _req: HttpRequest): Promise<void> {
    throw new Error('oops');
};

export default httpTrigger;
