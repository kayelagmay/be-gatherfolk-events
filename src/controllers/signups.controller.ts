import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const signupForEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  const { name, email } = req.body;

  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof email !== 'string' || !/^[^@]+@[^@]+\.[^@]+$/.test(email)
  ) {
    console.warn('⚠️  Validation failed');
    return res.status(400).json({ message: 'Name and valid email are required.' });
  }

  try {
    const { data, error } = await supabase
      .from('signups')
      .insert([{ event_id: eventId, name: name.trim(), email: email.trim() }])
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      if ((error as any).code === '23505') {
        return res.status(409).json({ message: 'You have already signed up.' });
      }
      return res.status(500).json({ message: error.message });
    }

    return res.status(201).json({ signup: data });
  } catch (err: unknown) {
    console.error('🔥 Unexpected error in signupForEvent:', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ message: msg });
  }
};
