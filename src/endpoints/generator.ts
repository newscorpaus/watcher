import { Request, Response, RequestHandler, NextFunction } from 'express';
import * as moment from 'moment';
import { workflow } from './../workflows/update';
import { times } from 'async';
import { db } from './../db';
import { v4 } from 'uuid';
import uuid = require('uuid');

let inserted: any[] = [];

const generatorEndpoint = (req: Request, res: Response, next: NextFunction) => {
    const times = req.query.times;
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
                valid: false,
                events: []
            };
        }

        const entry = {
            capi_id: articleId,
            event: workflow[i],
            workflow: 'ArticleUpdates',
            created: baseUTC
        };

        db[articleId].events.push(entry);

        inserted.push(entry);

        if (n == 8) {
            db[articleId].valid = true;
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
