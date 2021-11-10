import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (context: Context, _req: HttpRequest): Promise<void> {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.res = {
        body: `Version: ${process.version}
Arch: ${process.arch}
Modules (abi): ${process.versions.modules}`,
    };
};

export default httpTrigger;
