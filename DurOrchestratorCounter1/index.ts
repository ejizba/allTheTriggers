import * as df from 'durable-functions';

const orchestrator = df.orchestrator(function* (context) {
    const entityId = new df.EntityId('DurEntityCounter1', 'myAsyncCounter');

    const currentValue = yield context.df.callEntity(entityId, 'get');
    if (currentValue < 10) {
        yield context.df.callEntity(entityId, 'add', 1);
    }
});

export default orchestrator;
