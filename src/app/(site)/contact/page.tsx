import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { ContactForm, CallbackForm } from "@/components/forms";
import { contactInfo, businessName } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Contact ${businessName}`,
  description:
    "Contact iFarmer Agricultural Products Services Limited for services, product enquiries, bulk supply requests, and appointments."
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Contact Us"
        description="This contact page now submits real data to the backend for admin review while keeping the same straightforward brand style."
      />
      <section className="bg-white py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
            <h2 className="text-2xl font-bold text-[#2D5016]">Send us a message</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Messages are now stored through the backend instead of being simulated on the frontend.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-[#F5F5DC] p-8">
              <h3 className="text-2xl font-bold text-[#2D5016]">Contact information</h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
                <p>
                  <span className="font-semibold">Phone:</span> {contactInfo.phoneDisplay}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {contactInfo.email}
                </p>
                <div>
                  <span className="font-semibold">Address:</span>
                  <div className="mt-2 space-y-1">
                    {contactInfo.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <p>
                  <span className="font-semibold">Hours:</span> {contactInfo.openingHours}
                </p>
              </div>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                Chat With Us on WhatsApp
              </a>
            </div>

            <div className="rounded-3xl bg-[#F8FAF5] p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#2D5016]">Request a callback</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Callback requests are also saved to the admin dashboard for follow-up.
              </p>
              <div className="mt-6">
                <CallbackForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
