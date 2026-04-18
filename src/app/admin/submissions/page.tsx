"use client";

import AdminGuard from "@/components/admin-guard";
import AdminShell from "@/components/admin-shell";
import { useAppSelector } from "@/store/hooks";
import {
  useGetAppointmentsQuery,
  useGetBuyRequestsQuery,
  useGetCallbacksQuery,
  useGetContactsQuery
} from "@/store/services/api";

function SubmissionTable({
  title,
  headers,
  rows
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h3 className="text-xl font-bold text-[#2D5016]">{title}</h3>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminSubmissionsPage() {
  const { token, hydrated } = useAppSelector((state) => state.auth);
  const queryOptions = { skip: !hydrated || !token };
  const { data: contacts } = useGetContactsQuery(undefined, queryOptions);
  const { data: callbacks } = useGetCallbacksQuery(undefined, queryOptions);
  const { data: appointments } = useGetAppointmentsQuery(undefined, queryOptions);
  const { data: buyRequests } = useGetBuyRequestsQuery(undefined, queryOptions);

  return (
    <AdminGuard>
      <AdminShell
        title="Submissions"
        description="Review contact messages, callback requests, appointments, and product buy requests captured by the new backend."
      >
        <div className="space-y-8">
          <SubmissionTable
            title="Contact Submissions"
            headers={["Name", "Email", "Phone", "Subject"]}
            rows={
              contacts?.map((item) => [
                item.name,
                item.email,
                item.phone ?? "-",
                item.subject
              ]) ?? []
            }
          />
          <SubmissionTable
            title="Callback Requests"
            headers={["Name", "Phone", "Preferred Time"]}
            rows={
              callbacks?.map((item) => [
                item.name,
                item.phone,
                item.preferredTime
              ]) ?? []
            }
          />
          <SubmissionTable
            title="Appointments"
            headers={["Name", "Service", "Date", "Phone"]}
            rows={
              appointments?.map((item) => [
                item.name,
                item.service,
                item.appointmentDate,
                item.phone
              ]) ?? []
            }
          />
          <SubmissionTable
            title="Buy Requests"
            headers={["Buyer", "Product", "Quantity", "Destination"]}
            rows={
              buyRequests?.map((item) => [
                item.fullName,
                item.productName,
                item.quantity,
                item.destination ?? "-"
              ]) ?? []
            }
          />
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
