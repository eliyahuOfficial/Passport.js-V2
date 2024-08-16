import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;

    console.log(`[${now}] ${method} ${url} ${status}`);

    next();
};

export default logger;
