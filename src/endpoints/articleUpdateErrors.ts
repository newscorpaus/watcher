import { Request, Response, RequestHandler, NextFunction } from 'express';
import { db } from './../db';
import { keys, filter } from 'ramda';

const articleUpdateReport = (req: Request, res: Response, next: NextFunction) => {
    console.log('a!!!!');
    const articleIds = keys(db);
    console.log('b');

    const finder = (articleId: string) => {
        return db[articleId].valid == false;
    };

    console.log(1);

    const incompleteUpdates = filter(finder, articleIds);
    const incompletes: any = [];

    console.log(2);

    incompleteUpdates.forEach((articleId: any) => {
        incompletes.push(db[articleId]);
    });

    console.log(3);

    incompletes.push('test');
    console.log('incompletes: ', incompletes);

    res.json(incompletes);
};

export { articleUpdateReport };
