import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

// GET /api/events
export const getEvents = async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('DB error:', error);
    return res.status(500).json({ message: 'Could not fetch events' });
  }
  res.json({ events: data });
};

// POST /api/events/:id/signup
export const signupForEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  const { email } = req.body as { email?: string };
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  // Prevent duplicates
  const { data: existing, error: fetchError } = await supabase
    .from('signups')
    .select('*')
    .eq('event_id', eventId)
    .eq('user_email', email);
  if (fetchError) {
    console.error(fetchError);
    return res.status(500).json({ message: 'DB error' });
  }
  if (existing && existing.length > 0) {
    return res.status(400).json({ message: 'Already signed up' });
  }
  // Insert
  const { error: insertError } = await supabase
    .from('signups')
    .insert([{ event_id: eventId, user_email: email }]);
  if (insertError) {
    console.error(insertError);
    return res.status(500).json({ message: 'Could not sign up' });
  }
  res.json({ message: 'Signed up!' });
};

// POST /api/events
export const createEvent = async (req: Request, res: Response) => {
  const { title, description, venue, start_date, end_date } = req.body;
  try {
    const { error, data } = await supabase
    .from('events')
    .insert([{ title, description, venue, start_date, end_date }])
    .select();

    if (error) {
    console.error('Create event error:', error);
    return res.status(500).json({ message: 'Could not create event' });
    }

    return res.status(201).json({ event: data![0] });
  } catch (err) {
    console.error('Unexpected error creating event:', err);
    return res.status(500).json({ message: 'Could not create event' });
  }
};

// PUT /api/events/:id
export const updateEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updates = req.body;
  try {
    const { error, data } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Update event error:', error);
      return res.status(500).json({ message: 'Could not update event' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.json({ event: data![0] });
  } catch (err) {
    console.error('Unexpected error updating event:', err);
    return res.status(500).json({ message: 'Could not update event' });
  }
};

// DELETE /api/events/:id
export const deleteEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete event error:', error);
      return res.status(500).json({ message: 'Could not delete event' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('Unexpected error deleting event:', err);
    return res.status(500).json({ message: 'Could not delete event' });
  }
};