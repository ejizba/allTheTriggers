import { Context, HttpRequest } from '@azure/functions';

// https://aka.ms/functions-js-async-await
module.exports = async function (_context: Context, _req: HttpRequest): Promise<void> {
    return new Promise((_resolve, _reject) => {
        setTimeout(() => {
            throw new Error('cant catch this');
        }, 100);
    });
};
