import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (_context: Context, _req: HttpRequest): Promise<void> {
    process.exit(-1073741819);
};

export default httpTrigger;
