import { Request, Response, RequestHandler, NextFunction } from 'express';
import { db } from './../db';
import uuid = require('uuid');

const dbEndpoint = (req: Request, res: Response, next: NextFunction) => {
    res.json(db);
};

export { dbEndpoint };
