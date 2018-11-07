import { Callback, S3Event } from 'aws-lambda';

const s3Watcher = (event: S3Event, ctx: any, cb: Callback) => {
    console.log('The event - ', JSON.stringify(event, undefined, 4));

    return cb(undefined, 'OK.');
};

export { s3Watcher };
