import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ token: process.env.ADMIN_TOKEN });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

router.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || typeof authHeader !== 'string') {
    return res.status(401).json({ message: 'Authorization required' });
  }
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return res.json({ user: { role: 'staff' } });
});


router.post('/logout', (_req: Request, res: Response) => {
  
  res.json({ message: 'Logged out' });
});

export default router;