import { Request, Response, RequestHandler, NextFunction } from 'express';
import * as moment from 'moment';
import { workflow } from './../workflows/update';
import { times } from 'async';
import { db } from './../db';
import { v4 } from 'uuid';
import uuid = require('uuid');

let inserted: any[] = [];

const generatorEndpoint = (req: Request, res: Response, next: NextFunction) => {
    let times = req.query.times;
    const random = req.query.random;

    if (random) {
        times = Math.floor(Math.random() * Math.floor(8));
    }

    const articleId = req.query.articleId || uuid.v4();

    generator(times, articleId, () => {
       res.json(inserted);
       inserted = [];
    });
};

const generator = (n: number, articleId: string, cb: Watcher.Callback): void => {
    let baseUTC = moment.utc();

    const messageGenerator = (i: number, cb: Watcher.Callback): void => {
        baseUTC = baseUTC.add(getRandomMilliseconds(3000), 'milliseconds');

        if (!db[articleId]) {
            db[articleId] = {
                status: 'pending',
                events: []
            };
        }

        const entry = {
            capi_id: articleId,
            event: workflow[i],
            workflow: 'ArticleUpdates',
            created: baseUTC,
            received: moment.utc()
        };

        db[articleId].events.push(entry);

        inserted.push(entry);

        if (n == 8) {
            db[articleId].status = 'complete';
        }

        cb();
    };

    times(n, messageGenerator, (err: Error) => {
        if (err) {
            console.log('Err generating workflow data for ', articleId);
        }

        return cb(err);
    });

};

function getRandomMilliseconds(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export { generatorEndpoint };
