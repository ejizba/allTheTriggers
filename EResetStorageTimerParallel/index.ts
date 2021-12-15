import * as appinsights from 'applicationinsights';
appinsights.setup().start();

import { AzureFunction, Context } from '@azure/functions';
import { BlockBlobClient } from '@azure/storage-blob';
import { getRandomHexString } from '../utils/randomUtils';
import { Readable } from 'stream';

const timerTrigger: AzureFunction = async function (_context: Context, _myTimer: any): Promise<void> {
    return await appinsights.wrapWithCorrelationContext(async () => {
        const content = getRandomHexString(512 * 1024);
        const requests = [];
        for (let index = 0; index < 250; index++) {
            const blobClient = new BlockBlobClient(
                <string>process.env['zbastor1_STORAGE'],
                'econnreset',
                getRandomHexString(10)
            );
            const stream = new Readable();
            stream.push(Buffer.from(content));
            stream.push(null);
            requests.push(blobClient.uploadStream(stream));
        }
        await Promise.all(requests);
    })();
};

export default timerTrigger;
