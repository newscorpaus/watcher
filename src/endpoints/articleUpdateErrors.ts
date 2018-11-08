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
    res.send({ 'message': 'Consider yourself surprised. There have been some wonderful moments in article updating in the last 10 minutes!' });
};

function getSelectQuery(articleId: string): string {
    return `select * from ARTICLE_UPDATES where capi_id='${ articleId }'`;
}

export { articleUpdateErrors };
