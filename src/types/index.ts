export type NavItem = {
  label: string;
  href: string;
};

export type Highlight = {
  label: string;
  value: string;
};

export type Service = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  longDescription: string[];
  image: string;
  heroImage: string;
  features: string[];
  highlights: Highlight[];
  seoTitle: string;
  seoDescription: string;
  cta: string;
};

export type Product = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  details: string[];
  image: string;
  gallery: string[];
  category: string;
  origin: string;
  minOrder: string;
  availability: string;
  seoTitle: string;
  seoDescription: string;
  useCases: string[];
};

export type BlogPost = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  tags: string[];
};

export type Testimonial = {
  name: string;
  role: string;
  image: string;
  text: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  tag: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export type SiteStat = {
  label: string;
  value: number;
  suffix?: string;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "admin";
};

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type CallbackPayload = {
  name: string;
  phone: string;
  preferredTime: string;
};

export type AppointmentPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  appointmentDate: string;
  notes?: string;
};

export type BuyRequestPayload = {
  productName: string;
  productSlug: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  quantity: string;
  destination?: string;
  message?: string;
};

export type AdminLoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: AdminUser;
};

export type SubmissionRecord = {
  _id: string;
  createdAt: string;
};

export type ContactSubmission = SubmissionRecord & ContactPayload;

export type CallbackRequest = SubmissionRecord & CallbackPayload;

export type Appointment = SubmissionRecord & AppointmentPayload & {
  status: "pending" | "confirmed" | "completed";
};

export type BuyRequest = SubmissionRecord & BuyRequestPayload & {
  status: "new" | "reviewed" | "contacted";
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type AdminDashboardData = {
  contacts: ContactSubmission[];
  callbacks: CallbackRequest[];
  appointments: Appointment[];
  buyRequests: BuyRequest[];
};
