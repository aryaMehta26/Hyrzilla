import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Isolated PostgreSQL-compatible database: never touches production or sends mail.
const db = new PGlite();
try {
  await db.exec(`create role anon; create role authenticated; create role service_role;
    create table public.candidates_prod(id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now(),full_name text,email text,phone text,selected_plan text,
    tech_domain text,experience_years text,message text,status text);`);
  for (const file of ['202610030001_inquiry_consent.sql','202610240001_email_outbox.sql']) {
    await db.exec(await readFile(new URL(`../supabase/migrations/${file}`,import.meta.url),'utf8'));
  }
  const enqueue = (email,messages=[{subject:'team'},{subject:'confirmation'}]) => db.query(
    'select public.enqueue_inquiry($1::jsonb,$2::jsonb) as id',
    [JSON.stringify({email,full_name:'QA',status:'Professional Inquiry'}),JSON.stringify(messages)]);
  await enqueue(' QA@EXAMPLE.COM ');
  const lead = (await db.query('select * from public.candidates_prod')).rows[0];
  assert.equal(lead.email,'qa@example.com'); assert.equal(lead.consent_version,'2026-10-03'); assert(lead.consent_at);
  assert.equal((await db.query('select * from public.inquiry_email_outbox')).rows.length,2);
  await assert.rejects(enqueue('qa@example.com'),/inquiry_rate_limited/);
  await assert.rejects(enqueue('rollback@example.com',[{subject:'team'},null]),/check constraint/);
  assert.equal((await db.query("select count(*)::int as n from public.candidates_prod where email='rollback@example.com'")).rows[0].n,0);
  const first=(await db.query('select * from public.claim_inquiry_email()')).rows[0];
  const second=(await db.query('select * from public.claim_inquiry_email()')).rows[0];
  assert.notEqual(first.id,second.id);
  assert.equal((await db.query('select * from public.claim_inquiry_email()')).rows.length,0);
  await db.query("update public.inquiry_email_outbox set lease_until=now()-interval '1 minute' where id=$1",[first.id]);
  const retry=(await db.query('select * from public.claim_inquiry_email()')).rows[0];
  assert.equal(retry.id,first.id);assert.equal(retry.attempts,2);
  await db.query("update public.inquiry_email_outbox set first_attempt_at=now()-interval '24 hours',lease_until=now()-interval '1 minute' where id=$1",[first.id]);
  await db.query('select * from public.claim_inquiry_email()');
  assert.equal((await db.query('select state from public.inquiry_email_outbox where id=$1',[first.id])).rows[0].state,'manual_review');
  await db.query("insert into public.inquiry_email_events values('evt1','provider-1','email.delivered',now(),now()),('evt2','provider-1','email.bounced',now()-interval '1 minute',now())");
  await db.query("update public.inquiry_email_outbox set state='accepted',provider_id='provider-1' where id=$1",[second.id]);
  await db.query('select public.reconcile_inquiry_email_events()');
  assert.equal((await db.query('select delivery_status from public.inquiry_email_outbox where id=$1',[second.id])).rows[0].delivery_status,'email.bounced');
  await db.exec('set role anon');
  await assert.rejects(db.query('select * from public.inquiry_email_outbox'),/permission denied/);
  await assert.rejects(db.query('select public.claim_inquiry_email()'),/permission denied/);
  await assert.rejects(enqueue('unauthorized@example.com'),/permission denied/);
  await db.exec('reset role');
  console.log('PASS: atomic enqueue/rollback, consent, normalization, duplicate rejection, exclusive claims, lease recovery, retry cutoff, event reconciliation, anonymous access denied.');
} finally { await db.close(); }
