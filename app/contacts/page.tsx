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
          {t('contacts.title')}
        </h1>

        <div className="mx-auto mt-5 h-px w-20 bg-[#8b3a4a]" />

        <p className="mx-auto mt-5 max-w-xl text-[#765c63]">
          {t('contacts.text')}
        </p>
      </div>

      <dl className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-[#e5c8ce] bg-[#fff8f8] p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#8b3a4a] hover:shadow-lg">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1dce0] text-xl">
            📍
          </div>

          <dt className="text-sm uppercase tracking-widest text-[#8b3a4a]">
            {t('contacts.address')}
          </dt>

          <dd className="mt-3 text-lg text-[#42121e]">
            {t('contacts.city')}
            <br />
            {t('contacts.addressHint')}
          </dd>
        </div>

        <div className="rounded-3xl border border-[#e5c8ce] bg-[#fff8f8] p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#8b3a4a] hover:shadow-lg">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1dce0] text-xl">
            ☎
          </div>

          <dt className="text-sm uppercase tracking-widest text-[#8b3a4a]">
            {t('contacts.phone')}
          </dt>

          <dd className="mt-3 text-lg text-[#42121e]">
            +998 97 187 60 10
          </dd>
        </div>

        <div className="rounded-3xl border border-[#e5c8ce] bg-[#fff8f8] p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#8b3a4a] hover:shadow-lg">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1dce0] text-xl">
            🕐
          </div>

          <dt className="text-sm uppercase tracking-widest text-[#8b3a4a]">
            {t('contacts.hoursLabel')}
          </dt>

          <dd className="mt-3 text-lg text-[#42121e]">
            {t('contacts.daily')}
            <br />
            9:00–21:00
          </dd>
        </div>
      </dl>
    </main>
  );
}
