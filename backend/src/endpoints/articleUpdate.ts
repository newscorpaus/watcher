import { Client } from 'pg';
import { Request, Response, RequestHandler, NextFunction } from 'express';

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'watcher'
});

const articleUpdate = (req: Request, res: Response, next: NextFunction) => {
    console.log('Running .... ');
    const articleId = req.params.articleId;

    client.connect((err) => {
        if (err) {
            console.log('Err connecting to lookup ', articleId);
            return next(err);
        }

        client.query(getSelectQuery(articleId), (err, results) => {
            if (err) {
                return next(err);
            }

            const reply = [{
                valid: true,
                events: results.rows
            }];

            res.json(reply);
        });
    });

};

function getSelectQuery(articleId: string): string {
    return `select * from ARTICLE_UPDATES where capi_id='${ articleId }'`;
}

export { articleUpdate };
