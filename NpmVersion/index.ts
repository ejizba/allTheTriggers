import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { exec } from 'child_process';
import { promisify } from 'util';

const httpTrigger: AzureFunction = async function (context: Context, _req: HttpRequest): Promise<void> {
    const execP = promisify(exec);

    const result = await execP('node --version');
    const result2 = await execP('npm --version');
    let result3;
    try {
        result3 = (await execP('"%ProgramFiles(x86)%/npm/8.1.0/npm" --version')).stdout.trim();
    } catch (err) {
        result3 = err;
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: `node: ${result.stdout.trim()},
npm: ${result2.stdout.trim()},
npm2: ${result3},
PATH: ${process.env.PATH?.split(';').join('\n    ')}
TEST_VAR: ${process.env.TEST_VAR},
TEST_VAR2: ${process.env.TEST_VAR2},
TEST_VAR3: ${process.env.TEST_VAR3}`,
    };
};

export default httpTrigger;
