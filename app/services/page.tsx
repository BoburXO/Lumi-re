
import Link from "next/link";
import { services } from "@/lib/data";
import { getT } from "@/lib/i18n/server";

export default async function Page() {
  const { t } = await getT();
  return (
    <main className="wrap max-w-5xl py-14">
      <div className="text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#8b3a4a]">
          Luxe Beauty
        </p>

        <h1 className="serif text-5xl font-semibold text-[#5a1828] md:text-6xl">
          {t('servicesPage.title')}
        </h1>

        <div className="mx-auto mt-5 h-px w-20 bg-[#8b3a4a]" />

        <p className="mx-auto mt-5 max-w-xl text-[#765c63]">
          {t('servicesPage.text')}
        </p>
      </div>

      <ul className="mt-10 grid gap-5">
        {services.map((s) => (
          <li
            key={s.id}
            className="group flex flex-col gap-5 rounded-3xl border border-[#e5c8ce] bg-[#fff8f8] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#8b3a4a] hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f1dce0] text-xl text-[#6b2031] transition duration-300 group-hover:bg-[#8b3a4a] group-hover:text-white">
                ✦
              </div>

              <div>
                <p className="text-xl font-medium text-[#42121e]">
                  {t(`services.${s.id}`)}
                </p>

                <p className="mt-1 text-sm text-[#7a6670]">
                  {t('servicesPage.duration', { min: s.min })}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <span className="text-xl font-semibold text-[#8b3a4a]">
                {s.price} ₽
              </span>

              <Link
                href={`/booking?service=${s.id}`}
                className="rounded-full bg-[#6b2031] px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-[#8b3a4a] hover:shadow-[0_8px_25px_rgba(139,58,74,0.3)]"
              >
                {t('servicesPage.choose')}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

