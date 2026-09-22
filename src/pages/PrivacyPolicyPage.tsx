"use client";

import SEO from "../components/SEO";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy - Bright Arena Interiors"
        description="Privacy policy and data handling practices for Bright Arena Interiors."
        url="https://www.brightarenainteriors.com/privacy-policy"
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-[#4a1c13]/5">
          <h1 className="text-4xl md:text-5xl font-primary mb-8 text-[#ff7043]">Privacy Policy</h1>
          
          <div className="space-y-8 text-[#4a1c13]/80 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">1. Information We Collect</h2>
              <p>We may collect personal information such as your name, email address, phone number, and project details when you fill out our contact forms, request a consultation, or interact with our services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">2. How We Use Information</h2>
              <p>The information we collect is used to understand your interior design requirements, respond to inquiries, provide customized proposals, and communicate project updates. We may also use your information to improve our website and services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">3. Contact Forms</h2>
              <p>When you submit a contact form, the data is securely transmitted to our team to facilitate communication regarding your interior design project. This data is kept strictly confidential and is only accessible by authorized Bright Arena personnel.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">4. Cookies</h2>
              <p>Our website uses cookies to enhance the user experience, analyze traffic, and understand how visitors interact with the site. You can adjust your browser settings to refuse cookies, though some parts of our site may not function optimally as a result.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">5. Third-Party Services</h2>
              <p>We do not sell or share your personal information with third parties for marketing purposes. However, we may use trusted third-party service providers (such as website analytics and hosting partners) to assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">6. Data Security</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the internet is entirely secure, and we cannot guarantee its absolute security.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">7. Data Retention</h2>
              <p>We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including satisfying any legal, accounting, or reporting requirements.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">8. User Rights</h2>
              <p>Depending on your location, you may have the right to request access to, correction of, or deletion of your personal data. If you wish to exercise these rights, please contact us using the information below.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-primary mb-4 text-[#4a1c13]">9. Contact Information</h2>
              <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
              <ul className="mt-4 list-none font-medium text-[#4a1c13]">
                <li>Email: <a href="mailto:info@brightarenainteriors.com" className="hover:text-[#ff7043] transition-colors">info@brightarenainteriors.com</a></li>
                <li className="mt-2">Phone: <a href="tel:+918978222980" className="hover:text-[#ff7043] transition-colors">+91 8978 222 980</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
