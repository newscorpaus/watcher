import { Request, Response, RequestHandler, NextFunction } from 'express';
import { validator } from './../validators/article-update';
import { db } from './../db';


const articleUpdate = (req: Request, res: Response, next: NextFunction) => {
    const articleId = req.params.articleId;

    res.json(db[articleId]);
};

export { articleUpdate };
