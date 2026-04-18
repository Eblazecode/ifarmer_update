import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { businessName } from "@/data/site-content";

const effectiveDate = "March 26, 2026";

export const metadata: Metadata = {
  title: `Cookie Policy | ${businessName}`,
  description:
    "Read the cookie policy for iFarmer Agricultural Products Services Limited."
};

export default function CookiePolicyPage() {
  return (
    <div>
      <PageHero
        title="Cookie Policy"
        description="How this website uses cookies and local browser storage to support performance and user experience."
      />
      <section className="bg-[#F5F5DC] py-20">
        <div className="container">
          <article className="prose-content mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-soft md:p-12">
            <p>
              <strong>Effective Date:</strong> {effectiveDate}
            </p>
            <p>
              This Cookie Policy explains how {businessName} uses cookies and related browser-storage technologies on this website.
            </p>

            <h2>What Cookies Are</h2>
            <p>
              Cookies are small data files placed on your device by your browser. They help websites remember certain preferences, support essential functionality, and improve the general browsing experience.
            </p>

            <h2>How We Use Cookies</h2>
            <ul>
              <li>To remember cookie-notice preferences on your device.</li>
              <li>To support interface behavior such as interactive widgets and smoother browsing flows.</li>
              <li>To maintain stable website functionality for forms, navigation, and user-interface components.</li>
            </ul>

            <h2>Categories of Cookies We May Use</h2>
            <ul>
              <li><strong>Essential cookies:</strong> required for core website behavior and basic preference storage.</li>
              <li><strong>Performance-related storage:</strong> used to improve user experience and interface behavior where necessary.</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>
              You can control cookies and local browser storage through your browser settings. You can also dismiss or accept the on-site cookie notice when it appears. Clearing browser storage may reset saved preferences.
            </p>

            <h2>More Information</h2>
            <p>
              For information about how submitted personal data is handled, please read our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
