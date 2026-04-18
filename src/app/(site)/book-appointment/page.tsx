import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { AppointmentForm } from "@/components/forms";
import { businessName, services } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Book Appointment | ${businessName}`,
  description:
    "Book an appointment with iFarmer Agricultural Products Services Limited for service consultations, product sourcing, and project discussions."
};

export default function BookAppointmentPage() {
  return (
    <div>
      <PageHero
        title="Book an Appointment"
        description="A dedicated booking page now gives visitors a cleaner route into consultations, demos, and service discussions."
      />
      <section className="bg-[#F5F5DC] py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#2D5016]">Request your appointment</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Appointment requests are stored on the backend so admins can review and respond.
            </p>
            <div className="mt-8">
              <AppointmentForm />
            </div>
          </div>

          <div className="rounded-3xl bg-[#2D5016] p-8 text-white">
            <h3 className="text-2xl font-bold">What can you book for?</h3>
            <ul className="mt-6 space-y-3 text-white/80">
              {services.map((service) => (
                <li key={service.slug} className="rounded-2xl bg-white/10 px-5 py-4">
                  {service.title}
                </li>
              ))}
              <li className="rounded-2xl bg-white/10 px-5 py-4">
                Product sourcing and bulk purchase conversations
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
