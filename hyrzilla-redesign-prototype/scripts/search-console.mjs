// Run with an owner-authorized OAuth token stored in the process environment.
// Requires https://www.googleapis.com/auth/webmasters scope. Never log the token.
const token=process.env.GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN;
if (!token) { console.error('Sign into the owner’s Search Console account or supply a scoped OAuth token securely in GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN.'); process.exit(1); }
const headers={Authorization:`Bearer ${token}`,'Content-Type':'application/json'};
const response=await fetch('https://www.googleapis.com/webmasters/v3/sites',{headers});
if (!response.ok) throw new Error(`Search Console access failed (${response.status})`);
const sites=(await response.json()).siteEntry || [];
const site=sites.find(x=>['sc-domain:hyrzilla.com','https://www.hyrzilla.com/'].includes(x.siteUrl)&&['siteOwner','siteFullUser'].includes(x.permissionLevel));
if (!site) throw new Error('Verify ownership of hyrzilla.com in Search Console first.');
const sitemap='https://www.hyrzilla.com/sitemap.xml';
const endpoint=`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site.siteUrl)}/sitemaps/${encodeURIComponent(sitemap)}`;
if (process.argv.includes('--submit')) {
  const sent=await fetch(endpoint,{method:'PUT',headers});
  if (!sent.ok) throw new Error(`Sitemap submission failed (${sent.status})`);
  console.log('Sitemap submitted. This does not guarantee indexing.');
}
const status=await fetch(endpoint,{headers});
console.log('Sitemap status:',status.status===404?'Not submitted':status.ok?await status.json():`HTTP ${status.status}`);
for(const path of ['/','/professionals','/employers','/contact']){
  const result=await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',{
    method:'POST',headers,body:JSON.stringify({inspectionUrl:`https://www.hyrzilla.com${path}`,siteUrl:site.siteUrl,languageCode:'en-US'})
  });
  console.log(path,result.ok?(await result.json()).inspectionResult?.indexStatusResult:`HTTP ${result.status}`);
}
