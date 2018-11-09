import { Request, Response, RequestHandler, NextFunction } from 'express';
import { db } from './../db';
import { keys, filter } from 'ramda';
import { updateStates } from './lib/updateStates';

const articleUpdateReport = (req: Request, res: Response, next: NextFunction) => {
    updateStates();

    const articleIds = keys(db);

    const completeFinder = (articleId: string) => {
        return db[articleId].status == 'complete';
    };

    const pendingFinder = (articleId: string) => {
        return db[articleId].status == 'pending';
    };

    const failedFinder = (articleId: string) => {
        return db[articleId].status == 'failed';
    };


    const completeIds = filter(completeFinder, articleIds);
    const pendingIds =  filter(pendingFinder, articleIds);
    const failedIds =  filter(failedFinder, articleIds);

    const completes: any = [];
    const pending: any = [];
    const failed: any = [];

    completeIds.forEach((articleId: any) => {
        completes.push(db[articleId]);
    });

    pendingIds.forEach((articleId: any) => {
        pending.push(db[articleId]);
    });

    failedIds.forEach((articleId: any) => {
        failed.push(db[articleId]);
    });

    const report = {
        pending: pending,
        failed: failed,
        complete: completes
    };

    res.json(report);
};

export { articleUpdateReport };
