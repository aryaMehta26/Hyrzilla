import { Webhook } from 'npm:svix@1';
import { verifyDeliveryEvent } from './webhook.ts';
const secret = `whsec_${btoa('test-only-secret-32-characters!!!')}`;
const raw = JSON.stringify({ type:'email.delivered',created_at:new Date().toISOString(),data:{email_id:'email-1'} });
function signedHeaders(time = new Date()) {
  return new Headers({ 'svix-id':'evt-1','svix-timestamp':String(Math.floor(time.getTime()/1000)),
    'svix-signature':new Webhook(secret).sign('evt-1',time,raw) });
}
function rejects(fn: () => unknown) { let rejected=false;try{fn();}catch{rejected=true;}if(!rejected)throw new Error('Expected rejection'); }
Deno.test('valid signed event is verified',()=>{
  if(verifyDeliveryEvent(raw,signedHeaders(),secret).data.email_id!=='email-1')throw new Error('Wrong event');
});
Deno.test('tampered body, absent signature and stale signature are rejected',()=>{
  rejects(()=>verifyDeliveryEvent(raw+' ',signedHeaders(),secret));
  rejects(()=>verifyDeliveryEvent(raw,new Headers(),secret));
  rejects(()=>verifyDeliveryEvent(raw,signedHeaders(new Date(Date.now()-600000)),secret));
});
