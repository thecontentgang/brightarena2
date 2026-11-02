# Google Search Console Checklist

Do these steps after the fixes in `SEO_FIXES.md` are deployed to production. They need Search Console access, which the audit didn't have. Rankings won't recover right away: Google has to recrawl and reprocess each URL, which usually takes days for the homepage and weeks for deeper pages.

## 0. Before you start
- [ ] Use a **Domain property** (`brightarenainteriors.com`) if one exists, so the http/https and www/non-www variants are all covered. Otherwise use the `https://www.brightarenainteriors.com/` URL-prefix property.
- [ ] Confirm the deploy is live by running `node scripts/validate-seo.mjs --live`. It must print "All SEO checks passed."
- [ ] Record today's figures (impressions, clicks, average position, indexed page count) so you can compare later.

## 1. Inspect the affected URLs
In **URL Inspection**, check each URL below. Record the following each time:
- **Page indexing:** Indexed / not indexed, and the reason
- **User-declared canonical** (should end in `/`)
- **Google-selected canonical**
- **Last crawl** date
- **Crawled as:** smartphone

Priority URLs:
- `https://www.brightarenainteriors.com/`
- `/about/`, `/services/`, `/portfolio/`, `/designs/`, `/blogs/`, `/contact/`, `/testimonials/`
- `/services/home-interior-designs-hyderabad/`
- `/services/commercial-interior-designers-in-hyderabad/`
- `/services/office-interior-designers-in-hyderabad/`
- `/services/2d-3d-interior-design-services-in-hyderabad/`
- `/interior-designer-gachibowli/`, `/interior-designer-madhapur/`, `/interior-designer-hitec-city/`, `/interior-designer-kondapur/`, `/interior-designer-whitefields/`
- `/luxury-interior-designers-in-hyderabad/`, `/top-interior-designer-in-hyderabad/`
- `/blogs/how-to-choose-the-best-interior-designer-in-hyderabad/` (was a 404 until this fix)

How to read the results:

| What you see | Meaning | Action |
|---|---|---|
| Google-selected = the page's own `…/` URL | Healthy | Nothing |
| Google-selected = the homepage | Google folded the page into the homepage, a leftover from the period when every URL served homepage HTML. This is why the homepage description shows for it. | Request indexing (step 3) |
| Google-selected = the slashless URL (`…/about`) | Google followed the old canonical tag | Request indexing |
| "Alternate page with proper canonical tag" or "Page with redirect" on a slash URL | The canonical conflict hurt this page | Request indexing |
| Last crawl before **7 Oct 2026** | Google still holds the single-page-app version, with the homepage title and description in its HTML | Request indexing |

## 2. Check what Google actually received
For 3–4 of the URLs above:
- [ ] Click **Test Live URL** → **View tested page** → **HTML**.
- [ ] Confirm `<head>` contains one `<title>`, one `<meta name="description">` and one `<link rel="canonical">` with the trailing slash, all specific to that page.
- [ ] Check **Screenshot** shows the page, and **More info → Page resources** shows no blocked resources.
- [ ] Compare with **View crawled page**, the indexed copy. If the indexed copy still shows the homepage title, the page simply hasn't been reprocessed yet.

## 3. Request indexing
- [ ] After a successful live test, click **Request indexing** for each URL whose last crawl predates the fix, or whose Google-selected canonical is wrong. Search Console limits how many requests you can make per day, so start with the homepage, the 4 service pages, the 5 location pages, then the rest.
- [ ] Don't request the same URL repeatedly. One request is enough.
- [ ] Don't request indexing for the alias URLs (`/top-interior-designers-in-hyderabad/`, `/top-luxury-interior-designers-in-hyderabad/`) or for `/blogs/art-of-biophilic-design/` (noindex).

## 4. Resubmit the sitemaps
- [ ] Go to **Indexing → Sitemaps**.
- [ ] Resubmit `https://www.brightarenainteriors.com/sitemap.xml`, `/blog-sitemap.xml` and `/image-sitemap.xml`.
- [ ] Confirm each shows **Success** and a "Discovered pages" count (main 34, blog 6).
- [ ] If old sitemap URLs from the WordPress site are listed (e.g. `/sitemap_index.xml`, `/post-sitemap.xml`), remove them.

## 5. Check indexing status (Pages report)
In **Indexing → Pages**, open each reason and export the URL list:
- [ ] **Not found (404):** expect the old WordPress URLs. For each one with backlinks or past traffic (step 7), decide whether to restore the content or redirect to an exact equivalent.
- [ ] **Soft 404:** expect the old blog URLs that redirect to `/blogs/`. These lost their ranking value; consider restoring the best of them.
- [ ] **Duplicate, Google chose different canonical than user:** any current page here confirms a canonical problem. Inspect it individually.
- [ ] **Duplicate without user-selected canonical:** should empty out after recrawl.
- [ ] **Alternate page with proper canonical tag:** should contain only the two alias URLs once the fix is processed.
- [ ] **Page with redirect:** expected for slashless and old URLs. It should not contain any URL listed in the sitemaps.
- [ ] **Crawled / Discovered – currently not indexed:** note any sitemap URLs here. These are usually thin pages (portfolio and design details).
- [ ] After the fix is deployed, click **Validate fix** on the duplicate and canonical reasons.

## 6. Compare search performance
In **Performance → Search results**, use **Compare** with these date ranges, which follow the site's history:

| Period | Dates | Site state |
|---|---|---|
| A | before 30 Jun 2026 | WordPress |
| B | 30 Jun – 6 Oct 2026 | Single-page app: every URL served homepage HTML; slashless canonicals from 4 Oct |
| C | 7 Oct – deploy date | Prerendered, but 31 pages with canonicals pointing at redirects |
| D | deploy date onward | Fixed |

- [ ] Compare A vs B. A large drop here points to the migration (lost URLs and content), not the canonical change.
- [ ] Compare B vs C. Look for a further drop or a recovery after 4 Oct and 12 Oct.
- [ ] On the **Pages** tab, sort by click difference to find the URLs that lost the most. Note whether each one still exists, redirects or 404s.
- [ ] On the **Queries** tab, check core queries such as "interior designers in hyderabad", "luxury interior designers in hyderabad" and "interior designer gachibowli". Note which URL ranks for each, before and after. If the ranking URL keeps switching between `/` and `/top-interior-designer-in-hyderabad/`, the two pages are competing for the same query.
- [ ] Note CTR changes for pages where Google showed the homepage description.
- [ ] Repeat the D comparison 2, 4 and 8 weeks after deploying.

## 7. Prioritise lost URLs
- [ ] In **Links → Top linked pages**, export the list and match it against the 404 and soft-404 URLs from step 5. Old URLs with external links are the first to restore or redirect.
- [ ] In **Settings → Crawl stats**, check the response-code breakdown after the deploy. 308 responses to internal pages should fall, and 404s should be limited to genuinely removed URLs.

## 8. Ongoing
- [ ] Run `npm run build && npm run seo:check` before every deploy.
- [ ] After each deploy, run `node scripts/validate-seo.mjs --live`.
- [ ] Re-check the Page indexing report monthly.
