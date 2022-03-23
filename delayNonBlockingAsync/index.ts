import { Context, HttpRequest } from '@azure/functions';

/**
 * Test related to https://github.com/Azure/azure-functions-nodejs-worker/pull/547
 */
module.exports = async function (context: Context, _req: HttpRequest): Promise<void> {
    context.log('1');
    await new Promise((resolve) => setTimeout(resolve, 500));
    context.log('2');
    context.done();
    await new Promise((resolve) => setTimeout(resolve, 500));
    context.log('3');
};

/** before:
[2022-03-23T01:17:32.889Z] Executing 'Functions.delayNonBlockingAsync' (Reason='This function was programmatically called via the host APIs.', Id=6f763305-1dbe-43d3-8371-19d296e2db27)
[2022-03-23T01:17:32.893Z] 1
[2022-03-23T01:17:33.393Z] 2
[2022-03-23T01:17:33.393Z] InvocationResponse received for invocation id: '6f763305-1dbe-43d3-8371-19d296e2db27'
[2022-03-23T01:17:33.393Z] Executed 'Functions.delayNonBlockingAsync' (Succeeded, Id=6f763305-1dbe-43d3-8371-19d296e2db27, Duration=504ms)
[2022-03-23T01:17:33.894Z] Warning: Unexpected call to 'log' on the context object after function execution has completed. Please check for asynchronous calls that are not awaited or calls to 'done' made before function execution completes. Function name: delayNonBlockingAsync. Invocation Id: 6f763305-1dbe-43d3-8371-19d296e2db27. Learn more: https://go.microsoft.com/fwlink/?linkid=2097909 
 */

/** after:
[2022-03-23T01:12:12.997Z] Executing 'Functions.delayNonBlockingAsync' (Reason='This function was programmatically called via the host APIs.', Id=cc7a627d-4f34-4d52-894c-5d1367e2ee27)
[2022-03-23T01:12:13.037Z] Received FunctionInvocationRequest
[2022-03-23T01:12:13.037Z] 1
[2022-03-23T01:12:13.544Z] 2
[2022-03-23T01:12:13.557Z] InvocationResponse received for invocation id: 'cc7a627d-4f34-4d52-894c-5d1367e2ee27'
[2022-03-23T01:12:14.659Z] Executed 'Functions.delayNonBlockingAsync' (Succeeded, Id=cc7a627d-4f34-4d52-894c-5d1367e2ee27, Duration=1672ms)
[2022-03-23T01:12:14.673Z] Warning: Unexpected call to 'log' on the context object after function execution has completed. Please check for asynchronous calls that are not awaited or calls to 'done' made before function execution completes. Function name: delayNonBlockingAsync. Invocation Id: cc7a627d-4f34-4d52-894c-5d1367e2ee27. Learn more: https://go.microsoft.com/fwlink/?linkid=2097909 
[2022-03-23T01:12:14.674Z] Error: Choose either to return a promise or call 'done'.  Do not use both in your script.
 */
