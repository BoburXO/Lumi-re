
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { kindKeys, statusKeys, labelMap, serviceLabel, roleLabel } from "@/lib/data";

type AdminPanelProps = {
  bookings: any[];
  masters: any[];
  clients: any[];
};

export function AdminPanel({
  bookings,
  masters,
  clients,
}: AdminPanelProps) {
    const { t } = useTranslation();
  const kinds = labelMap(t, "kinds", kindKeys);
  const statuses = labelMap(t, "statuses", statusKeys);
  const router = useRouter();

  const [tab, setTab] = useState("bookings");
  const [err, setErr] = useState("");

  const tabs = [
    ["bookings", t("admin.tabs.bookings", { count: bookings.length })],
    ["masters", t("admin.tabs.masters", { count: masters.length })],
    ["clients", t("admin.tabs.clients", { count: clients.length })],
  ];

  const call = async (
    url: string,
    method: string,
    body?: object
  ) => {
    try {
      setErr("");

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (res.ok) {
        router.refresh();
        return true;
      }

      const data = await res.json().catch(() => null);
      setErr(data?.error || t("admin.genericError"));
      return false;
    } catch {
      setErr(t("admin.requestFailed"));
      return false;
    }
  };

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (await call("/api/masters", "POST", data)) {
      form.reset();
    }
  }

  async function logout() {
    await fetch("/api/admin", {
      method: "DELETE",
    });

    router.push("/admin/pin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      {/* HEADER */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b3a4a]">
            Luxe Beauty
          </p>

          <h1 className="serif text-5xl font-semibold text-[#5a1828] md:text-6xl">
            {t('admin.title')}
          </h1>

          <p className="mt-3 text-[#765c63]">
            {t('admin.subtitle')}
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-full border border-[#d9b8c0] px-6 py-3 text-sm font-medium text-[#6b2031] transition duration-300 hover:border-[#6b2031] hover:bg-[#6b2031] hover:text-white"
        >
          {t('admin.logout')}
        </button>
      </div>

      {/* TABS */}
      <div className="mb-8 flex flex-wrap gap-3">
        {tabs.map(([key, title]) => {
          const active = tab === key;

          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-[#6b2031] text-white shadow-[0_8px_25px_rgba(107,32,49,0.25)]"
                  : "border border-[#e3c5cb] bg-white text-[#6b2031] hover:border-[#8b3a4a] hover:bg-[#fff7f8]"
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>

      {/* ERROR */}
      {err && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {err}
        </div>
      )}

      {/* BOOKINGS */}
      {tab === "bookings" && (
        <section className="overflow-hidden rounded-[28px] border border-[#ead7dc] bg-white shadow-[0_15px_50px_rgba(91,24,40,0.07)]">
          <div className="border-b border-[#eadde1] px-6 py-5">
            <h2 className="serif text-2xl font-semibold text-[#4b1423]">
              {t('admin.bookings.title')}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-[#fff7f8] text-[#765c63]">
                <tr>
                  {[
                    t("admin.heads.client"),
                    t("admin.heads.phone"),
                    t("admin.heads.master"),
                    t("admin.heads.service"),
                    t("admin.heads.date"),
                    t("admin.heads.status"),
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 font-semibold"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-[#f0e3e6] transition hover:bg-[#fffafa]"
                  >
                    <td className="px-5 py-4 font-medium text-[#42121e]">
                      {booking.client_name}
                    </td>

                    <td className="px-5 py-4 text-[#765c63]">
                      {booking.phone}
                    </td>

                    <td className="px-5 py-4 text-[#765c63]">
                      {booking.master ?? "—"}
                    </td>

                    <td className="px-5 py-4 text-[#765c63]">
                      {serviceLabel(t, booking.service)}
                    </td>

                    <td className="px-5 py-4 text-[#765c63]">
                      {booking.day} {booking.time}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        className="rounded-xl border border-[#e3c5cb] bg-[#fffafa] px-3 py-2 text-sm text-[#5a1828] outline-none transition focus:border-[#8b3a4a]"
                        value={booking.status}
                        onChange={(e) =>
                          call(
                            `/api/bookings/${booking.id}`,
                            "PATCH",
                            {
                              status: e.target.value,
                            }
                          )
                        }
                      >
                        {Object.entries(statuses).map(
                          ([key, title]) => (
                            <option key={key} value={key}>
                              {title}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* CLIENTS */}
      {tab === "clients" && (
        <section className="overflow-hidden rounded-[28px] border border-[#ead7dc] bg-white shadow-[0_15px_50px_rgba(91,24,40,0.07)]">
          <div className="border-b border-[#eadde1] px-6 py-5">
            <h2 className="serif text-2xl font-semibold text-[#4b1423]">
              {t('admin.clients.title')}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#fff7f8] text-[#765c63]">
                <tr>
                  {[
                    t("admin.heads.name"),
                    "Email",
                    t("admin.heads.registered"),
                    t("admin.heads.visits"),
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 font-semibold"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-t border-[#f0e3e6] transition hover:bg-[#fffafa]"
                  >
                    <td className="px-5 py-4 font-medium text-[#42121e]">
                      {client.name}
                    </td>

                    <td className="px-5 py-4 text-[#765c63]">
                      {client.email}
                    </td>

                    <td className="px-5 py-4 text-[#765c63]">
                      {client.created?.slice(0, 10) ?? "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[#f4e4e8] px-3 py-1 text-xs font-semibold text-[#6b2031]">
                        {client.visits}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MASTERS */}
      {tab === "masters" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* MASTER LIST */}
          <section className="rounded-[28px] border border-[#ead7dc] bg-white p-6 shadow-[0_15px_50px_rgba(91,24,40,0.07)]">
            <div className="mb-6">
              <h2 className="serif text-2xl font-semibold text-[#4b1423]">
                {t('admin.mastersTab.title')}
              </h2>

              <p className="mt-1 text-sm text-[#866b72]">
                {t('admin.mastersTab.subtitle')}
              </p>
            </div>

            <ul className="space-y-3">
              {masters.map((master) => (
                <li
                  key={master.id}
                  className="group flex items-center gap-4 rounded-2xl border border-[#eee0e4] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#d9b8c0] hover:shadow-md"
                >
                  {master.photo ? (
                    <img
                      src={master.photo}
                      alt={master.name}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f3e1e5] text-xl text-[#6b2031]">
                      ✦
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#42121e]">
                      {master.name}
                    </p>

                    <p className="mt-1 text-sm text-[#7a6670]">
                      {kinds[master.kind]} · {roleLabel(t, master.role)}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#8b3a4a]">
                      {master.price} ₽
                    </p>
                  </div>

                  <button
                    className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
                    onClick={() =>
                      window.confirm(
                        t("admin.mastersTab.confirmDelete", { name: master.name })
                      ) &&
                      call(
                        `/api/masters/${master.id}`,
                        "DELETE"
                      )
                    }
                  >
                    {t('admin.mastersTab.delete')}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* ADD MASTER */}
          <form
            onSubmit={add}
            className="h-fit rounded-[28px] border border-[#ead7dc] bg-white p-7 shadow-[0_15px_50px_rgba(91,24,40,0.07)]"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b3a4a]">
                {t('admin.mastersTab.formEyebrow')}
              </p>

              <h2 className="serif mt-2 text-3xl font-semibold text-[#4b1423]">
                {t('admin.mastersTab.formTitle')}
              </h2>
            </div>

            <div className="space-y-4">
              <input
                required
                name="name"
                placeholder={t("admin.mastersTab.name")}
                className="inp w-full"
              />

              <input
                required
                name="role"
                placeholder={t("admin.mastersTab.role")}
                className="inp w-full"
              />

              <select
                name="kind"
                className="inp w-full"
              >
                {Object.entries(kinds).map(([key, title]) => (
                  <option key={key} value={key}>
                    {title}
                  </option>
                ))}
              </select>

              <input
                required
                type="number"
                min="1"
                name="price"
                placeholder={t("admin.mastersTab.price")}
                className="inp w-full"
              />

              <input
                name="photo"
                placeholder={t("admin.mastersTab.photo")}
                className="inp w-full"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-[#6b2031] px-6 py-3.5 font-medium text-white transition duration-300 hover:bg-[#8b3a4a] hover:shadow-[0_10px_30px_rgba(107,32,49,0.25)]"
              >
                {t('admin.mastersTab.submit')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

