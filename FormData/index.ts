import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = req.query.name || (req.body && req.body.name);
    const responseMessage = name
        ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
        : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

    const form = await req.parseFormBody();
    console.log('(get) name = ' + form.get('name')?.value);
    console.log('(get) greeting = ' + form.get('greeting')?.value);

    for (const [name, part] of form) {
        console.log(`(for-loop) ${name} = ${part.value.toString()}`);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
    };
};

export default httpTrigger;
