# SteadyOps custom domain

Target: https://steadyops.in

The site is the static SteadyOps POC demo. It replays controller-generated evidence; a live infrastructure controller requires separate backend hosting.

## 1. Configure GitHub first

Open https://github.com/GudaSriram/maintenance-control-plane/settings/pages

- Under Build and deployment, select **GitHub Actions** as Source.
- Set **Custom domain** to `steadyops.in` and save.
- A CNAME source file does not configure the domain when publishing through a custom Actions workflow; the repository setting is required.

## 2. Configure the domain's DNS

In the DNS manager for the purchased domain, replace conflicting parking records for `@` with these four A records. Keep unrelated mail and verification records.

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | gudasriram.github.io |

Use the DNS provider's default TTL. The www record has no repository path. Remove or correct conflicting website AAAA records if present, rather than sending IPv6 visitors to another host.

## 3. Deploy and verify

Re-run the failed **Deploy demo to GitHub Pages** job, or run that workflow manually. Allow DNS propagation and GitHub certificate issuance, then enable **Enforce HTTPS** in Pages settings. Verify both https://steadyops.in and https://www.steadyops.in display or redirect to SteadyOps.

GitHub documentation: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
