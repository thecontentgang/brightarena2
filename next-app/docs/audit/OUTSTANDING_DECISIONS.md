# Outstanding Decisions and Required Assets

Last updated: 2026-11-13. The Vite app is unchanged, nothing has been committed, and all earlier fixes (F1–F8) and audit results still apply.

## Status at a glance

| Item | Status | Waiting for |
|---|---|---|
| Contact page form (N1) | **Implemented and tested with EmailJS mocked (F9)** | You: create the Contact template in EmailJS, add its ID, approve one real test send |
| Location hero images ×4 (N2) | **Unchanged by decision** (references kept, sections kept) | You: 4 approved original photos + publishing rights |
| Founder photographs ×2 (N3) | **Unchanged by decision** | You: 2 approved original photos + publishing rights |

---

## 1. Contact page form (N1): implemented

### Your decisions, as implemented

| Decision | Implementation |
|---|---|
| Same receiving inbox as Talk Now; do not change its recipient | No recipient is set in code. The new template must use the **same "To Email"** as the existing Talk Now template (dashboard step below). The Talk Now template is not touched |
| Option B: separate template | New variable `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID`. It reuses `NEXT_PUBLIC_EMAILJS_SERVICE_ID` and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` |
| Subject "New Website Enquiry – Contact Page" | Sent as the `{{subject}}` variable (exact text) |
| Reply-To = customer email | Sent as the `{{reply_to}}` variable |
| Name required | Yes |
| Email required and valid | Yes (same rule as Talk Now) |
| Phone optional; if given, a 10-digit Indian mobile | Accepts spaces, hyphens, brackets and a +91 / 91 / 0 prefix. The number must be 10 digits starting with 6–9. It is sent normalised to 10 digits, or "Not provided" |
| Project type: keep the field and its behaviour | Same four options and labels, still optional. Sent as the label, or "Not specified" |
| Message required | Yes. The label now shows "Project Details \*" like the other required fields |
| Talk Now messaging style | The same success ("✓ Request sent successfully / Our team will contact you shortly.") and error ("Unable to send your request / Please check your details and try again.") banners, plus an inline message under each invalid field |
| Clear only after success | Fields are cleared after a successful send. On a validation, server or network failure the visitor's input is kept |
| No real email until approved | All tests intercepted EmailJS in the browser. **0 real emails sent** |
| Talk Now must be unaffected | `src/components/ProjectModal.tsx` was not modified. A regression run produced results identical to before |

**Files:**
- `src/lib/contactForm.ts` (new): validation and template variables.
- `src/components/ContactForm.tsx` (new): the form UI.
- `src/views/ContactPage.tsx`: the inline form replaced by `<ContactForm />`.
- `scripts/test-contact-form.mjs` (new): unit tests.
- `package.json`: the `test:contact` script; `verify` now includes it.
- `.env.example` and `README.md`: the new variable and template setup.

### What you need to do in the EmailJS dashboard (requires your approval or action)

1. **Create a new email template** (for example "Website – Contact Page") on the **same email service** as Talk Now.
2. **To Email:** copy the exact value from the existing Talk Now template. Do not edit the Talk Now template.
3. **Subject:** `{{subject}}`. It will read "New Website Enquiry – Contact Page".
4. **Reply To:** `{{reply_to}}`.
5. **Body:** use these variables, which the form sends: `{{name}}`, `{{email}}`, `{{phone}}`, `{{project_type}}`, `{{message}}`, `{{source}}` (always "Contact page").
6. **Template ID:** copy it into `next-app/.env.local` as `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=<id>`. Later, also add it to the Vercel project for Production and Preview. Do not paste the value into chat or docs.
7. Recommended: in EmailJS **Account → Security**, restrict allowed origins to `www.brightarenainteriors.com` (plus localhost and the preview domain while testing).
8. **Rebuild** (`pnpm build`). `NEXT_PUBLIC_*` values are compiled into the site at build time.

**Behaviour until step 6 is done:** a valid submission shows the error banner, keeps the visitor's input, and sends nothing. It logs "EmailJS environment variables for the Contact page form are missing." to the browser console. Talk Now keeps working.

### Still requires your explicit approval

- **One real test submission** after the template exists. Tell me the test name and email to use, or send it yourself. Then confirm it arrived in the Talk Now inbox with the right subject and Reply-To.

---

## 2. Missing images (N2, N3): unchanged until you send the photos

Per your decision, the six broken references, their paths, alt texts and image sections are kept exactly as they are. No stock, AI-generated or unrelated project images will be used.

### Agreed plan

| Image | Component (line) | Target file | Code change needed |
|---|---|---|---|
| HITEC City hero | `src/views/HitecCityInteriorDesignerPage.tsx` (186) | `public/images/hitec-city-interior-hero.jpg` (existing path kept) | none |
| Gachibowli hero | `src/views/GachibowliInteriorDesignerPage.tsx` (193) | `public/images/gachibowli-interior-hero.jpg` | none |
| Kondapur hero | `src/views/KondapurInteriorDesignerPage.tsx` (193) | `public/images/kondapur-interior-hero.jpg` | none |
| Madhapur hero | `src/views/MadhapurInteriorDesignerPage.tsx` (180) | `public/images/madhapur-interior-hero.jpg` | none |
| Srilatha Ravuri | `src/views/AboutPage.tsx` line 24 (`IMAGES.founderA`) | `public/founders/srilatha-ravuri.webp` | point `founderA` at the local file |
| Bhawani Shankar Guruvelli | `src/views/AboutPage.tsx` line 25 (`IMAGES.founderB`) | `public/founders/bhawani-shankar-guruvelli.webp` | point `founderB` at the local file |

**Format note (please confirm when you send the files):** you prefer WebP, and you also asked to keep the existing location paths, which end in `.jpg`. Both cannot hold at once:

- **(a) Keep the `.jpg` paths exactly.** The four heroes are saved as JPG; no code change.
- **(b) Use WebP.** Change only the extension in each of the four `src` attributes (`…-interior-hero.webp`; same folder and name).

The founder photos will be WebP either way. Either option goes through `pnpm images:optimize` (quality 80, the same as every other image).

**Alt text:** kept as it is for now. That includes the spelling "Hitech City" on the HITEC City hero; changing it would need your approval.

### Image specifications (to preserve the current layout)

- **Location heroes:** landscape, at least 1920 × 1080 (2400 × 1350 preferred).
  - The slot is 4:5 on phones (below 640 px), 16:9 at 640–767 px, and 21:9 from 768 px. The image is cropped to fill, scaled to 110%, and moves with parallax.
  - Keep the subject inside the central ~45% of the width and the central ~75% of the height.
  - Measured slots: 1536×658 (1920 wide), 1376×590 (1440), 704×302 (768), 390×488 (390).
- **Founder photographs:** portrait, at least 1200 × 1500.
  - The slot changes between 460×529 (desktop), 332×728 (1024), 670×350 (768) and 340×350 (mobile).
  - Keep the face and shoulders in the central ~40% vertically and ~45% horizontally.

### Replacement checklist (per image)

- [ ] Original Bright Arena photo or render supplied by you (not stock, not AI-generated, not an unrelated project)
- [ ] Publishing rights confirmed in writing (including consent from any recognisable people or home owners)
- [ ] Meets the minimum size; the subject is inside the safe zone
- [ ] Saved under the agreed name and folder (table above); format (a) or (b) confirmed for the heroes
- [ ] `pnpm images:optimize` run (recorded in `scripts/image-manifest.json`)
- [ ] Visual check at 1920 / 1440 / 768 / 390 / 360 px (portrait and landscape crops)
- [ ] `pnpm verify` passes; the audit re-run shows 0 broken images on the five affected routes

### Needed from you

1. The six original photographs, labelled by location or founder.
2. Written confirmation of publishing rights for each.
3. Hero format: **(a)** keep `.jpg` paths, or **(b)** WebP with a one-word `src` change per page.
