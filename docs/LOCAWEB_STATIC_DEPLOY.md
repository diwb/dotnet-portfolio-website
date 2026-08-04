# Locaweb Static Deploy

1. Run `npm install`.
2. Run `npm run build`.
3. Confirm `npm run verify:out`.
4. Upload the contents of `out/` to `public_html` or the configured site root through FTP.
5. Keep Node.js out of the production requirement.

If custom 404 routing is required, add a static hosting rule or `.htaccess` suitable for the hosting plan.
