import { Context, HttpRequest } from '@azure/functions';

/**
 * Test related to https://github.com/Azure/azure-functions-nodejs-worker/pull/547
 */
module.exports = function (context: Context, _req: HttpRequest): void {
    context.log('1');
    setTimeout(() => {
        context.log('2');
        context.done();
        setTimeout(() => {
            context.log('3');
        }, 1);
    }, 1);
};

/** before:
[2022-03-23T01:17:29.001Z] Executing 'Functions.delayNonBlocking' (Reason='This function was programmatically called via the host APIs.', Id=4463728a-5bec-4ae3-a42e-2f32c08ca3ca)
[2022-03-23T01:17:29.004Z] 1
[2022-03-23T01:17:29.006Z] 2
[2022-03-23T01:17:29.006Z] InvocationResponse received for invocation id: '4463728a-5bec-4ae3-a42e-2f32c08ca3ca'
[2022-03-23T01:17:29.007Z] Executed 'Functions.delayNonBlocking' (Succeeded, Id=4463728a-5bec-4ae3-a42e-2f32c08ca3ca, Duration=6ms)
[2022-03-23T01:17:29.009Z] Warning: Unexpected call to 'log' on the context object after function execution has completed. Please check for asynchronous calls that are not awaited or calls to 'done' made before function execution completes. Function name: delayNonBlocking. Invocation Id: 4463728a-5bec-4ae3-a42e-2f32c08ca3ca. Learn more: https://go.microsoft.com/fwlink/?linkid=2097909 
 */

/** after:
[2022-03-23T01:16:31.465Z] Executing 'Functions.delayNonBlocking' (Reason='This function was programmatically called via the host APIs.', Id=47ff77ca-bf3f-49ba-8836-bcaa896d2a25)
[2022-03-23T01:16:31.479Z] Received FunctionInvocationRequest
[2022-03-23T01:16:31.479Z] 1
[2022-03-23T01:16:31.479Z] 2
[2022-03-23T01:16:31.479Z] InvocationResponse received for invocation id: '47ff77ca-bf3f-49ba-8836-bcaa896d2a25'
[2022-03-23T01:16:31.479Z] Executed 'Functions.delayNonBlocking' (Succeeded, Id=47ff77ca-bf3f-49ba-8836-bcaa896d2a25, Duration=15ms)
[2022-03-23T01:16:31.480Z] Warning: Unexpected call to 'log' on the context object after function execution has completed. Please check for asynchronous calls that are not awaited or calls to 'done' made before function execution completes. Function name: delayNonBlocking. Invocation Id: 47ff77ca-bf3f-49ba-8836-bcaa896d2a25. Learn more: https://go.microsoft.com/fwlink/?linkid=2097909
 */
