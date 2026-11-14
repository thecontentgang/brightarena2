// Unit tests for the Contact page form rules (src/lib/contactForm.ts). No network, no EmailJS.
//   pnpm test:contact
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CONTACT_EMAIL_SUBJECT,
  CONTACT_ERROR_MESSAGES,
  EMPTY_CONTACT_FORM,
  buildContactTemplateParams,
  normalizeIndianMobile,
  validateContactForm,
} from "../src/lib/contactForm.ts";

const valid = { name: "QA Test", email: "qa@example.com", phone: "", projectType: "", message: "A 3BHK in Gachibowli." };

test("empty form: name, email and message are required; phone is not", () => {
  const e = validateContactForm(EMPTY_CONTACT_FORM);
  assert.deepEqual(Object.keys(e).sort(), ["email", "message", "name"]);
});

test("whitespace-only values count as empty", () => {
  const e = validateContactForm({ ...valid, name: "   ", message: "\n  " });
  assert.equal(e.name, CONTACT_ERROR_MESSAGES.name);
  assert.equal(e.message, CONTACT_ERROR_MESSAGES.message);
});

test("valid form with no phone and no project type passes", () => {
  assert.deepEqual(validateContactForm(valid), {});
});

test("email format", () => {
  for (const bad of ["bad", "a@b", "a b@c.com", "@x.com", "x@.com "]) {
    assert.equal(validateContactForm({ ...valid, email: bad }).email, CONTACT_ERROR_MESSAGES.email, bad);
  }
  for (const ok of ["qa@example.com", " qa.test+1@sub.example.in "]) assert.equal(validateContactForm({ ...valid, email: ok }).email, undefined, ok);
});

test("phone: optional, but must be a 10-digit Indian mobile when given", () => {
  const accepted = { "9876543210": "9876543210", "+91 98765 43210": "9876543210", "+91-98765-43210": "9876543210", "919876543210": "9876543210", "09876543210": "9876543210", "(+91) 6000000000": "6000000000" };
  for (const [input, digits] of Object.entries(accepted)) {
    assert.equal(normalizeIndianMobile(input), digits, input);
    assert.equal(validateContactForm({ ...valid, phone: input }).phone, undefined, input);
  }
  for (const bad of ["98765", "5876543210", "1234567890", "98765432101", "+44 7911 123456", "98765abc43", "040 2345 6789"]) {
    assert.equal(normalizeIndianMobile(bad), null, bad);
    assert.equal(validateContactForm({ ...valid, phone: bad }).phone, CONTACT_ERROR_MESSAGES.phone, bad);
  }
});

test("template params: subject, reply-to, normalised phone, project type label, trimmed fields", () => {
  const p = buildContactTemplateParams({ name: " Asha ", email: " asha@example.com ", phone: "+91 98765 43210", projectType: "commercial", message: " Office fit-out " });
  assert.deepEqual(p, {
    subject: CONTACT_EMAIL_SUBJECT,
    source: "Contact page",
    name: "Asha",
    email: "asha@example.com",
    reply_to: "asha@example.com",
    phone: "9876543210",
    project_type: "Commercial / Office",
    message: "Office fit-out",
  });
  assert.equal(CONTACT_EMAIL_SUBJECT, "New Website Enquiry – Contact Page");
});

test("template params: optional fields left blank are labelled", () => {
  const p = buildContactTemplateParams(valid);
  assert.equal(p.phone, "Not provided");
  assert.equal(p.project_type, "Not specified");
});
