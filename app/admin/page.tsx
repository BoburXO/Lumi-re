import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { listAppointments, listClients, listMasters } from "@/lib/db";
import { AdminPanel } from "@/components/admin-panel";
export const dynamic = "force-dynamic";
export default async function Page() {
  if (!(await isAdmin())) redirect("/admin/pin");
  const [bookings, masters, clients] = await Promise.all([
    listAppointments(),
    listMasters(),
    listClients(),
  ]);
  return (
    <main className="wrap py-10">
      <AdminPanel bookings={bookings} masters={masters} clients={clients} />
    </main>
  );
}
