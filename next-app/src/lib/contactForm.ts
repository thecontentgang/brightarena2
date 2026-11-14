/**
 * Contact page enquiry form: validation and EmailJS template parameters.
 * Pure functions with no framework imports, so they can be unit-tested directly
 * (scripts/test-contact-form.mjs). The Talk Now popup (ProjectModal) does not use this module.
 */

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  /** One of the <select> option values, or "" when the visitor did not choose (the field stays optional). */
  projectType: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const EMPTY_CONTACT_FORM: ContactFormValues = { name: "", email: "", phone: "", projectType: "", message: "" };

export const CONTACT_EMAIL_SUBJECT = "New Website Enquiry – Contact Page";

/** Same options, values and labels as the original Contact page <select>. */
export const PROJECT_TYPE_OPTIONS = [
  { value: "residential", label: "Residential Interior" },
  { value: "commercial", label: "Commercial / Office" },
  { value: "architecture", label: "Architecture" },
  { value: "furniture", label: "Bespoke Furniture" },
] as const;

/** Same email rule the Talk Now popup uses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalises an Indian mobile number to its 10 digits, or returns null if it is not one.
 * Accepts spaces, hyphens, brackets and a +91 / 91 / 0 prefix (the field's placeholder is "+91 XXXXX XXXXX").
 * Indian mobile numbers are 10 digits starting with 6, 7, 8 or 9.
 */
export function normalizeIndianMobile(raw: string): string | null {
  const value = raw.trim();
  if (!/^[+\d\s()-]+$/.test(value)) return null;
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export const CONTACT_ERROR_MESSAGES = {
  name: "Please enter your full name.",
  email: "Please enter a valid email address.",
  phone: "Please enter a valid 10-digit Indian mobile number, or leave this blank.",
  message: "Please tell us about your project.",
} as const;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!values.name.trim()) errors.name = CONTACT_ERROR_MESSAGES.name;
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = CONTACT_ERROR_MESSAGES.email;
  if (values.phone.trim() && normalizeIndianMobile(values.phone) === null) errors.phone = CONTACT_ERROR_MESSAGES.phone;
  if (!values.message.trim()) errors.message = CONTACT_ERROR_MESSAGES.message;
  return errors;
}

/**
 * Variables sent to the Contact page EmailJS template (NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID).
 * The template should use {{subject}} as its subject, {{reply_to}} as Reply-To, and the same "To Email"
 * as the Talk Now template. See docs/audit/OUTSTANDING_DECISIONS.md for the full template setup.
 */
export function buildContactTemplateParams(values: ContactFormValues) {
  const phone = values.phone.trim() ? normalizeIndianMobile(values.phone) : null;
  const projectType = PROJECT_TYPE_OPTIONS.find((o) => o.value === values.projectType)?.label;
  return {
    subject: CONTACT_EMAIL_SUBJECT,
    source: "Contact page",
    name: values.name.trim(),
    email: values.email.trim(),
    reply_to: values.email.trim(),
    phone: phone ?? "Not provided",
    project_type: projectType ?? "Not specified",
    message: values.message.trim(),
  };
}
