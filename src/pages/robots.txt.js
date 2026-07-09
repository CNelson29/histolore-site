export async function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: https://histolore.com/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } });
}
