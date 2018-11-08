import { Client } from 'pg';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { validator } from './../validators/article-update';

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'watcher'
});

const articleUpdateErrors = (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.articleId;

    // client.connect((err) => {
    //     if (err) {
    //         console.log('Err connecting to lookup ', articleId);
    //         return next(err);
    //     }

    //     client.query(getSelectQuery(articleId), (err, results) => {
    //         if (err) {
    //             return next(err);
    //         }

    //         const reply = [validator(results.rows)];

    //         client.end(() => {
    //             res.json(reply);
    //         });
    //     });
    // });

    return res.send({ 'message': 'Consider yourself surprised. There have been some wonderful moments in article updating in the last 10 minutes!' });
};

function getSelectQuery(articleId: string): string {
    return `select * from ARTICLE_UPDATES where capi_id='${ articleId }'`;
}

export { articleUpdateErrors };
