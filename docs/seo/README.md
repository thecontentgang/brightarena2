# Homepage SEO copy (not published)

`homepage-seo-copy.source.tsx.txt` holds the 13 sections from `docs/seo/source-pdfs/HOmepage copy.pdf` as ready-to-render JSX,
kept out of `src/` so it is not compiled or shown. It is NOT rendered anywhere.

Edits vs the PDF (unverifiable claims removed): areas Financial District/Kokapet/Jubilee Hills/Banjara Hills,
"Real client feedback" bullet, project-card/caption/filter sentences. See PDF Appendix C before publishing.
Needs a destination page decision (e.g. a new /interior-design-hyderabad/ guide) - do not put on the homepage.

## Luxury page (/luxury-interior-designers-in-hyderabad/) - implemented in src/pages/LuxuryPage.tsx

Copy, title, description, H1 and FAQPage schema come from the supplied "Luxury Interior Designers in Hyderabad:
Developer-Ready Page Content" PDF. Not built because the content/backing does not exist yet (the PDF says to hide these):
hero photo, 4-6 Featured Luxury Project cards, founder block (photo/name/bio), the multi-field enquiry form with floor-plan
upload (buttons open the existing ProjectModal instead), and event tracking (no analytics in the project).
Publish-time claims to confirm: penthouses; Jubilee Hills, Banjara Hills, Kokapet, Financial District; "principal designer".
