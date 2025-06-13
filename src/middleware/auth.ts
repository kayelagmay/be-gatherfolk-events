import { Request, Response, NextFunction } from 'express';

export const ensureStaff = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || typeof authHeader !== 'string') {
    return res.status(401).json({ message: 'Authorization required' });
  }
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};