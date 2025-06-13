import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { createEvent } from 'ics';
import type { EventAttributes } from 'ics';

export const generateIcs = async (req: Request, res: Response) => {
  const eventId = Number(req.params.eventId);

  const { data: ev, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).send('Database error');
  }
  if (!ev) {
    return res.status(404).send('Event not found');
  }

  const start = new Date(ev.start_date);
  const end = ev.end_date ? new Date(ev.end_date) : start;

  const icsEvent: EventAttributes = {
    start: [
      start.getUTCFullYear(),
      start.getUTCMonth() + 1,
      start.getUTCDate(),
      start.getUTCHours(),
      start.getUTCMinutes(),
    ],
    end: [
      end.getUTCFullYear(),
      end.getUTCMonth() + 1,
      end.getUTCDate(),
      end.getUTCHours(),
      end.getUTCMinutes(),
    ],
    title:       ev.title,
    description: ev.description || '',
    location:    ev.venue || '',
    uid:         `event-${eventId}@gatherfolk.events`,
    productId:   'GatherfolkEvents',
  };

  createEvent(icsEvent, (err, value) => {
    if (err) {
      console.error('ICS generation error:', err);
      return res.status(500).send('Failed to generate calendar file');
    }
    if (!value) {
      console.error('Generated ICS was empty');
      return res.status(500).send('Empty ICS file');
    }
    res
      .setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res
      .setHeader('Content-Disposition', `attachment; filename="event-${eventId}.ics"`);
    res.send(value);
  });
};