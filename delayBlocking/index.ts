import { Context, HttpRequest } from '@azure/functions';

/**
 * Test related to https://github.com/Azure/azure-functions-nodejs-worker/pull/547
 */
module.exports = function (context: Context, _req: HttpRequest): void {
    context.log('1');
    delaySync(500);
    context.log('2');
    context.done();
    delaySync(500);
    context.log('3');
};

function delaySync(ms: number) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
        // wait
    }
}

/** before:
[2022-03-23T01:17:24.668Z] Executing 'Functions.delay' (Reason='This function was programmatically called via the host APIs.', Id=3335398a-cb9c-4c6a-9830-e1ea5cd5d9a5)
[2022-03-23T01:17:25.756Z] 1
[2022-03-23T01:17:25.757Z] 2
[2022-03-23T01:17:25.770Z] InvocationResponse received for invocation id: '3335398a-cb9c-4c6a-9830-e1ea5cd5d9a5'
[2022-03-23T01:17:25.885Z] Executed 'Functions.delay' (Succeeded, Id=3335398a-cb9c-4c6a-9830-e1ea5cd5d9a5, Duration=1255ms)
[2022-03-23T01:17:25.913Z] Warning: Unexpected call to 'log' on the context object after function execution has completed. Please check for asynchronous calls that are not awaited or calls to 'done' made before function execution completes. Function name: delay. Invocation Id: 3335398a-cb9c-4c6a-9830-e1ea5cd5d9a5. Learn more: https://go.microsoft.com/fwlink/?linkid=2097909
 */

/** after:
[2022-03-23T01:14:34.100Z] Executing 'Functions.delay' (Reason='This function was programmatically called via the host APIs.', Id=c2ef252c-dd86-407f-8f86-826f5ccbf795)
[2022-03-23T01:14:35.106Z] Received FunctionInvocationRequest
[2022-03-23T01:14:35.106Z] 1
[2022-03-23T01:14:35.107Z] 2
[2022-03-23T01:14:35.107Z] Warning: Unexpected call to 'log' on the context object after function execution has completed. Please check for asynchronous calls that are not awaited or calls to 'done' made before function execution completes. Function name: delay. Invocation Id: c2ef252c-dd86-407f-8f86-826f5ccbf795. Learn more: https://go.microsoft.com/fwlink/?linkid=2097909 
[2022-03-23T01:14:35.109Z] 3
[2022-03-23T01:14:35.111Z] InvocationResponse received for invocation id: 'c2ef252c-dd86-407f-8f86-826f5ccbf795'
[2022-03-23T01:14:35.112Z] Executed 'Functions.delay' (Succeeded, Id=c2ef252c-dd86-407f-8f86-826f5ccbf795, Duration=1012ms)
 */
