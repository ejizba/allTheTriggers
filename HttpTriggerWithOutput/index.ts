import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log('HTTP trigger function processed a request.');
    const name = req.query.name || (req.body && req.body.name);
    const responseMessage = name
        ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
        : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

    context.bindings.outputQueueItem = 'test3';

    return {
        res: {
            // status: 200, /* Defaults to 200 */
            body: responseMessage,
        },
        outputQueueItem: name || 'noNameSpecified',
    };
};

export default httpTrigger;
