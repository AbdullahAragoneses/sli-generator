/**
 * SLI invoice-number counter — Cloudflare Worker
 *
 * This is a mirror of the actual deployed Worker source (viewed directly in the Cloudflare
 * dashboard's "Edit code" editor on 2026-08-02), kept here for reference/version control since
 * the live Worker isn't otherwise tracked in any repo.
 *
 * Bug found and fixed 2026-08-02: the `cors` headers object below was missing
 * `Access-Control-Allow-Headers`. Browsers require that header on the OPTIONS preflight
 * response whenever the real request carries a non-safelisted Content-Type (the app's PUT
 * requests send `application/json`) — without it, the browser silently blocks the actual PUT.
 * The app's own code then treats a blocked request the same as a successful one (see
 * `pushInvoiceToGitHub()`'s `.catch(() => onSuccess())` in Projects\SLI Generator\index.html),
 * so the on-screen invoice number kept climbing locally while this Worker's stored value never
 * actually moved — hence it always reset back to the last value that ever WAS saved (10162) on
 * every page reload. The fix is the single added `Access-Control-Allow-Headers` line below.
 *
 * Storage: KV namespace bound as `COUNTER` -> `sli-counter-kv`, key `invoice`.
 */

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };
    if (request.method === 'OPTIONS') return new Response(null, {headers: cors});
    if (request.method === 'GET') {
      const val = await env.COUNTER.get('invoice');
      return new Response(JSON.stringify({next: val ? parseInt(val) : 10162}), {headers: cors});
    }
    if (request.method === 'PUT') {
      const body = await request.json();
      const current = parseInt(await env.COUNTER.get('invoice') || '10162');
      if (body.expected !== current) {
        return new Response(JSON.stringify({error: 'conflict', current}), {status: 409, headers: cors});
      }
      await env.COUNTER.put('invoice', String(body.next));
      return new Response(JSON.stringify({next: body.next}), {headers: cors});
    }
    return new Response('Not allowed', {status: 405, headers: cors});
  }
}
