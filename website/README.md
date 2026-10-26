# SteadyOps website

Static Next.js export for GitHub Pages. The original Python control-plane demo remains at the repository root and is published at `/control-plane/`.

Run `npm install`, then `npm run build`. The deployable output is `out/`.
Set `NEXT_PUBLIC_BASE_PATH` to the Pages project path (or empty for a custom domain), and `NEXT_PUBLIC_SITE_URL` to the full public site URL. The workflow derives both from GitHub Pages settings.

All marketing routes and the narrated illustrative demo run without a server. Voice quality depends on the browser. Enquiry delivery is deliberately unavailable: GitHub Pages does not run the original server APIs. No credentials or private Sites hosting configuration are included.
