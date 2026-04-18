import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { businessName, contactInfo } from "@/data/site-content";

const effectiveDate = "March 26, 2026";

export const metadata: Metadata = {
  title: `Privacy Policy | ${businessName}`,
  description:
    "Read the privacy policy for iFarmer Agricultural Products Services Limited."
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero
        title="Privacy Policy"
        description="How iFarmer Agricultural Products Services Limited collects, uses, and protects personal information across this website."
      />
      <section className="bg-white py-20">
        <div className="container">
          <article className="prose-content mx-auto max-w-4xl rounded-[2rem] bg-[#F8FAF5] p-8 shadow-soft md:p-12">
            <p>
              <strong>Effective Date:</strong> {effectiveDate}
            </p>
            <p>
              {businessName} respects your privacy and is committed to protecting the information you share with us through this website, contact forms, appointment requests, buy requests, and WhatsApp interactions.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect personal and business information that you provide directly, including:</p>
            <ul>
              <li>Name, email address, phone number, and company details.</li>
              <li>Messages submitted through contact, callback, appointment, and buy-request forms.</li>
              <li>Commercial enquiry details such as product interest, quantity, destination, and service needs.</li>
              <li>Technical browsing data such as device, browser, and basic usage signals collected through essential cookies.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To respond to enquiries and provide requested information, quotes, or support.</li>
              <li>To review appointments, callbacks, and product requests submitted through the website.</li>
              <li>To improve website usability, performance, and business communication workflows.</li>
              <li>To maintain internal administrative records related to legitimate business enquiries.</li>
            </ul>

            <h2>How We Store and Protect Information</h2>
            <p>
              Information submitted through this website is stored in our backend systems and administrative tools so our team can review and respond appropriately. We take reasonable operational and technical measures to protect submitted information against unauthorized access, misuse, or loss.
            </p>

            <h2>Sharing of Information</h2>
            <p>
              We do not sell personal information. Information may be shared only where reasonably necessary to operate the website, respond to your request, comply with legal obligations, or support legitimate business processing.
            </p>

            <h2>Cookies and Website Usage</h2>
            <p>
              This website may use essential cookies and limited website-storage features to support functions such as cookie preferences and interface behavior. More detail is available in our{" "}
              <Link href="/cookie-policy">Cookie Policy</Link>.
            </p>

            <h2>Your Choices</h2>
            <ul>
              <li>You may contact us to request updates or corrections to information you previously submitted.</li>
              <li>You may clear browser storage to remove locally stored site preferences.</li>
              <li>You may stop using the website forms and contact us directly by phone or email if preferred.</li>
            </ul>

            <h2>Contact</h2>
            <p>
              If you have privacy questions, you can contact us at{" "}
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> or call{" "}
              <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phoneDisplay}</a>.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
