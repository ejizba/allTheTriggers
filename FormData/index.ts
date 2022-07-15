import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const form = req.parseFormBody();
    console.log('(get) name = ' + form.get('name')?.value);
    console.log('(get) greeting = ' + form.get('greeting')?.value);

    for (const [name, part] of form) {
        console.log(`(for-loop) ${name} = ${part.value.toString()}`);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: 'form stuff',
    };
};

export default httpTrigger;
