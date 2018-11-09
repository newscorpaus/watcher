import { Request, Response, RequestHandler, NextFunction } from 'express';
import { db } from './../db';
import { updateStates } from './lib/updateStates';


const dbEndpoint = (req: Request, res: Response, next: NextFunction) => {
    updateStates();

    res.json(db);
};



export { dbEndpoint };
