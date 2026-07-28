import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY,
    VAPID_SUBJECT = 'mailto:admin@sel-beryl.vercel.app',
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
  } = process.env;

  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    res.status(500).json({
      error: 'Missing server env',
      need: [
        'VAPID_PUBLIC_KEY',
        'VAPID_PRIVATE_KEY',
        'SUPABASE_URL',
        'SUPABASE_SERVICE_ROLE_KEY'
      ]
    });
    return;
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  const bodyIn =
    typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  const {
    title = 'EliteScore',
    body = '',
    url = '/dashboard.html',
    tag = 'elite-score'
  } = bodyIn;

  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: subs, error } = await sb.from('push_subscriptions').select('*');

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const payload = JSON.stringify({
    title,
    body,
    url,
    tag,
    icon: '/elite logo.png'
  });

  let sent = 0;
  const dead = [];

  await Promise.all(
    (subs || []).map(async (s) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: s.endpoint,
            keys: {
              p256dh: s.p256dh,
              auth: s.auth
            }
          },
          payload
        );
        sent++;
      } catch (err) {
        console.error('push fail', err.statusCode, err.body);
        if (err.statusCode === 404 || err.statusCode === 410) {
          dead.push(s.endpoint);
        }
      }
    })
  );

  if (dead.length) {
    await sb.from('push_subscriptions').delete().in('endpoint', dead);
  }

  res.status(200).json({
    ok: true,
    sent,
    removed: dead.length,
    total: (subs || []).length
  });
}