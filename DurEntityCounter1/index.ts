/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 *
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *    function app in Kudu
 */

import * as df from 'durable-functions';

const myFunc = df.entity(function (context) {
    let currentValue: number = <number>context.df.getState(() => 0);
    context.log('Entity state: ', currentValue);

    switch (context.df.operationName) {
        case 'add': {
            const amount = <number>context.df.getInput();
            currentValue += amount;
            break;
        }
        case 'reset':
            currentValue = 0;
            break;
        case 'get':
            context.df.return(currentValue);
            break;
    }

    context.df.setState(currentValue);
    context.log('Entity state: ', currentValue);
});

export default myFunc;
