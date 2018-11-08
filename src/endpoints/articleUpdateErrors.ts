import { Request, Response, RequestHandler, NextFunction } from 'express';
import { db } from './../db';
import { keys, filter } from 'ramda';

const articleUpdateReport = (req: Request, res: Response, next: NextFunction) => {
    const articleIds = keys(db);

    const finder = (articleId: string) => {
        return db[articleId].valid == false;
    };

    const incompleteUpdates = filter(finder, articleIds);
    const incompletes: any = [];

    incompleteUpdates.forEach((articleId: any) => {
        incompletes.push(db[articleId]);
    });

    res.json(incompletes);
};

export { articleUpdateReport };
