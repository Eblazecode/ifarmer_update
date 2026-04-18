import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { normalizeBlogPost, normalizeBlogPosts } from "@/lib/blog-content";
import type {
  AdminDashboardData,
  AdminLoginPayload,
  Appointment,
  AppointmentPayload,
  AuthResponse,
  BlogPost,
  BuyRequest,
  BuyRequestPayload,
  CallbackPayload,
  CallbackRequest,
  ContactPayload,
  ContactSubmission,
  Product,
  Service
} from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://ifarmer-backend.onrender.com/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("ifarmer_admin_token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    }
  }),
  tagTypes: [
    "Blogs",
    "Services",
    "Products",
    "Contacts",
    "Callbacks",
    "Appointments",
    "BuyRequests"
  ],
  endpoints: (builder) => ({
    submitContact: builder.mutation<{ message: string }, ContactPayload>({
      query: (body) => ({
        url: "/contacts",
        method: "POST",
        body
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message
      })
    }),
    submitCallback: builder.mutation<{ message: string }, CallbackPayload>({
      query: (body) => ({
        url: "/callbacks",
        method: "POST",
        body
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message
      })
    }),
    submitAppointment: builder.mutation<
      { message: string },
      AppointmentPayload
    >({
      query: (body) => ({
        url: "/appointments",
        method: "POST",
        body
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message
      }),
      invalidatesTags: ["Appointments"]
    }),
    submitBuyRequest: builder.mutation<
      { message: string },
      BuyRequestPayload
    >({
      query: (body) => ({
        url: "/buy-requests",
        method: "POST",
        body
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message
      }),
      invalidatesTags: ["BuyRequests"]
    }),
    loginAdmin: builder.mutation<AuthResponse, AdminLoginPayload>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body
      }),
      transformResponse: (response: { success: boolean; data: AuthResponse }) =>
        response.data
    }),
    getAdminDashboard: builder.query<AdminDashboardData, void>({
      query: () => "/admin/dashboard",
      transformResponse: (response: {
        success: boolean;
        data: AdminDashboardData;
      }) => response.data,
      providesTags: [
        "Contacts",
        "Callbacks",
        "Appointments",
        "BuyRequests"
      ]
    }),
    getAdminBlogs: builder.query<BlogPost[], void>({
      query: () => "/admin/blogs",
      transformResponse: (response: { success: boolean; data: BlogPost[] }) =>
        normalizeBlogPosts(response.data),
      providesTags: ["Blogs"]
    }),
    createBlog: builder.mutation<BlogPost, Partial<BlogPost>>({
      query: (body) => ({
        url: "/admin/blogs",
        method: "POST",
        body
      }),
      transformResponse: (response: { success: boolean; data: BlogPost }) =>
        normalizeBlogPost(response.data),
      invalidatesTags: ["Blogs"]
    }),
    updateBlog: builder.mutation<
      BlogPost,
      { id: string; body: Partial<BlogPost> }
    >({
      query: ({ id, body }) => ({
        url: `/admin/blogs/${id}`,
        method: "PUT",
        body
      }),
      transformResponse: (response: { success: boolean; data: BlogPost }) =>
        normalizeBlogPost(response.data),
      invalidatesTags: ["Blogs"]
    }),
    deleteBlog: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin/blogs/${id}`,
        method: "DELETE"
      }),
      transformResponse: (response: { success: boolean; message: string }) => ({
        message: response.message
      }),
      invalidatesTags: ["Blogs"]
    }),
    getAdminServices: builder.query<Service[], void>({
      query: () => "/admin/services",
      transformResponse: (response: { success: boolean; data: Service[] }) =>
        response.data,
      providesTags: ["Services"]
    }),
    createService: builder.mutation<Service, Partial<Service>>({
      query: (body) => ({
        url: "/admin/services",
        method: "POST",
        body
      }),
      transformResponse: (response: { success: boolean; data: Service }) =>
        response.data,
      invalidatesTags: ["Services"]
    }),
    updateService: builder.mutation<
      Service,
      { id: string; body: Partial<Service> }
    >({
      query: ({ id, body }) => ({
        url: `/admin/services/${id}`,
        method: "PUT",
        body
      }),
      transformResponse: (response: { success: boolean; data: Service }) =>
        response.data,
      invalidatesTags: ["Services"]
    }),
    getAdminProducts: builder.query<Product[], void>({
      query: () => "/admin/products",
      transformResponse: (response: { success: boolean; data: Product[] }) =>
        response.data,
      providesTags: ["Products"]
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/admin/products",
        method: "POST",
        body
      }),
      transformResponse: (response: { success: boolean; data: Product }) =>
        response.data,
      invalidatesTags: ["Products"]
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; body: Partial<Product> }
    >({
      query: ({ id, body }) => ({
        url: `/admin/products/${id}`,
        method: "PUT",
        body
      }),
      transformResponse: (response: { success: boolean; data: Product }) =>
        response.data,
      invalidatesTags: ["Products"]
    }),
    getContacts: builder.query<ContactSubmission[], void>({
      query: () => "/admin/contacts",
      transformResponse: (response: {
        success: boolean;
        data: ContactSubmission[];
      }) => response.data,
      providesTags: ["Contacts"]
    }),
    getCallbacks: builder.query<CallbackRequest[], void>({
      query: () => "/admin/callbacks",
      transformResponse: (response: {
        success: boolean;
        data: CallbackRequest[];
      }) => response.data,
      providesTags: ["Callbacks"]
    }),
    getAppointments: builder.query<Appointment[], void>({
      query: () => "/admin/appointments",
      transformResponse: (response: {
        success: boolean;
        data: Appointment[];
      }) => response.data,
      providesTags: ["Appointments"]
    }),
    getBuyRequests: builder.query<BuyRequest[], void>({
      query: () => "/admin/buy-requests",
      transformResponse: (response: {
        success: boolean;
        data: BuyRequest[];
      }) => response.data,
      providesTags: ["BuyRequests"]
    })
  })
});

export const {
  useSubmitContactMutation,
  useSubmitCallbackMutation,
  useSubmitAppointmentMutation,
  useSubmitBuyRequestMutation,
  useLoginAdminMutation,
  useGetAdminDashboardQuery,
  useGetAdminBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetAdminServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useGetContactsQuery,
  useGetCallbacksQuery,
  useGetAppointmentsQuery,
  useGetBuyRequestsQuery
} = api;
