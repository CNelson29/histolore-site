export async function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: https://curioushistory.net/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } });
}
