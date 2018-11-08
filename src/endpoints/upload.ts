import { Request, Response, RequestHandler, NextFunction } from 'express';
import { update } from './../db';

const uploadEndpoint = (req: Request, res: Response, next: NextFunction) => {
    update(req.body);
    res.send('Ok.');
};

export { uploadEndpoint };
