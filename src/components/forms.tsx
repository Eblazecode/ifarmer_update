"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useSubmitAppointmentMutation,
  useSubmitBuyRequestMutation,
  useSubmitCallbackMutation,
  useSubmitContactMutation
} from "@/store/services/api";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10)
});

const callbackSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  preferredTime: z.string().min(2)
});

const appointmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  service: z.string().min(2),
  appointmentDate: z.string().min(2),
  notes: z.string().optional()
});

const buyRequestSchema = z.object({
  productName: z.string().min(2),
  productSlug: z.string().min(2),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().optional(),
  quantity: z.string().min(1),
  destination: z.string().optional(),
  message: z.string().optional()
});

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400";

export function ContactForm() {
  const [submitContact, { isLoading, isSuccess }] = useSubmitContactMutation();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    }
  });

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [form, isSuccess]);

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(async (values) => {
        await submitContact(values).unwrap();
        toast.success("Message submitted successfully.");
      })}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" error={form.formState.errors.name?.message}>
          <input className={inputClassName} {...form.register("name")} />
        </Field>
        <Field label="Email address" error={form.formState.errors.email?.message}>
          <input className={inputClassName} {...form.register("email")} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone number" error={form.formState.errors.phone?.message}>
          <input className={inputClassName} {...form.register("phone")} />
        </Field>
        <Field label="Subject" error={form.formState.errors.subject?.message}>
          <select className={inputClassName} {...form.register("subject")}>
            <option value="">Select subject</option>
            <option value="Fertilizer Blending">Fertilizer Blending</option>
            <option value="Input Supply">Input Supply</option>
            <option value="Agricultural Project Management">
              Agricultural Project Management
            </option>
            <option value="Agri Software Solutions">Agri Software Solutions</option>
            <option value="Product Purchase">Product Purchase</option>
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </Field>
      </div>
      <Field label="Message" error={form.formState.errors.message?.message}>
        <textarea
          rows={6}
          className={inputClassName}
          {...form.register("message")}
        />
      </Field>
      <button
        type="submit"
        className="inline-flex items-center rounded-xl bg-[#2D5016] px-6 py-4 font-semibold text-white transition hover:bg-[#7CB342] disabled:opacity-70"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Send Message
      </button>
    </form>
  );
}

export function CallbackForm() {
  const [submitCallback, { isLoading }] = useSubmitCallbackMutation();
  const form = useForm<z.infer<typeof callbackSchema>>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      name: "",
      phone: "",
      preferredTime: ""
    }
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await submitCallback(values).unwrap();
        toast.success("Callback request sent.");
        form.reset();
      })}
    >
      <Field label="Your name" error={form.formState.errors.name?.message}>
        <input className={inputClassName} {...form.register("name")} />
      </Field>
      <Field label="Phone number" error={form.formState.errors.phone?.message}>
        <input className={inputClassName} {...form.register("phone")} />
      </Field>
      <Field
        label="Preferred time"
        error={form.formState.errors.preferredTime?.message}
      >
        <select className={inputClassName} {...form.register("preferredTime")}>
          <option value="">Choose time</option>
          <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
          <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
          <option value="Any convenient time">Any convenient time</option>
        </select>
      </Field>
      <button
        type="submit"
        className="w-full rounded-xl bg-[#8B4513] px-5 py-3 font-semibold text-white transition hover:bg-[#6d3610]"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Request Callback"}
      </button>
    </form>
  );
}

export function AppointmentForm({
  defaultService
}: {
  defaultService?: string;
}) {
  const [submitAppointment, { isLoading }] = useSubmitAppointmentMutation();
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: defaultService ?? "",
      appointmentDate: "",
      notes: ""
    }
  });

  useEffect(() => {
    if (defaultService) {
      form.setValue("service", defaultService);
    }
  }, [defaultService, form]);

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(async (values) => {
        await submitAppointment(values).unwrap();
        toast.success("Appointment request submitted.");
        form.reset({
          name: "",
          email: "",
          phone: "",
          service: defaultService ?? "",
          appointmentDate: "",
          notes: ""
        });
      })}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={form.formState.errors.name?.message}>
          <input className={inputClassName} {...form.register("name")} />
        </Field>
        <Field label="Email" error={form.formState.errors.email?.message}>
          <input className={inputClassName} {...form.register("email")} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone number" error={form.formState.errors.phone?.message}>
          <input className={inputClassName} {...form.register("phone")} />
        </Field>
        <Field label="Service" error={form.formState.errors.service?.message}>
          <input className={inputClassName} {...form.register("service")} />
        </Field>
      </div>
      <Field
        label="Preferred appointment date"
        error={form.formState.errors.appointmentDate?.message}
      >
        <input type="date" className={inputClassName} {...form.register("appointmentDate")} />
      </Field>
      <Field label="Additional notes" error={form.formState.errors.notes?.message}>
        <textarea
          rows={5}
          className={inputClassName}
          {...form.register("notes")}
        />
      </Field>
      <button
        type="submit"
        className="rounded-xl bg-[#2D5016] px-6 py-4 font-semibold text-white transition hover:bg-[#7CB342]"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Book Appointment"}
      </button>
    </form>
  );
}

export function BuyRequestForm({
  productName,
  productSlug
}: {
  productName: string;
  productSlug: string;
}) {
  const [submitBuyRequest, { isLoading }] = useSubmitBuyRequestMutation();
  const form = useForm<z.infer<typeof buyRequestSchema>>({
    resolver: zodResolver(buyRequestSchema),
    defaultValues: {
      productName,
      productSlug,
      fullName: "",
      email: "",
      phone: "",
      company: "",
      quantity: "",
      destination: "",
      message: ""
    }
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await submitBuyRequest(values).unwrap();
        toast.success("Buy request submitted.");
        form.reset({
          productName,
          productSlug,
          fullName: "",
          email: "",
          phone: "",
          company: "",
          quantity: "",
          destination: "",
          message: ""
        });
      })}
    >
      <Field label="Product">
        <input className={inputClassName} value={productName} readOnly />
      </Field>
      <Field label="Full name" error={form.formState.errors.fullName?.message}>
        <input className={inputClassName} {...form.register("fullName")} />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" error={form.formState.errors.email?.message}>
          <input className={inputClassName} {...form.register("email")} />
        </Field>
        <Field label="Phone" error={form.formState.errors.phone?.message}>
          <input className={inputClassName} {...form.register("phone")} />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Company">
          <input className={inputClassName} {...form.register("company")} />
        </Field>
        <Field label="Quantity needed" error={form.formState.errors.quantity?.message}>
          <input className={inputClassName} {...form.register("quantity")} />
        </Field>
      </div>
      <Field label="Destination / Delivery location">
        <input className={inputClassName} {...form.register("destination")} />
      </Field>
      <Field label="Additional details">
        <textarea rows={4} className={inputClassName} {...form.register("message")} />
      </Field>
      <button
        type="submit"
        className="w-full rounded-xl bg-[#2D5016] px-5 py-4 font-semibold text-white transition hover:bg-[#7CB342]"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Buy Request"}
      </button>
    </form>
  );
}
