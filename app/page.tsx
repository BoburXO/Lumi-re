
import Link from "next/link";

import { listMasters } from "@/lib/db";
import { services } from "@/lib/data";
import { MasterCard } from "@/components/masters";
import { getT } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { t } = await getT();
  const masters = (await listMasters()).slice(0, 3);

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#e5b7c3]/25 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#d9a0ad]/15 blur-[130px]" />

        <div className="wrap relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          {/* HERO TEXT */}
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#e8d8dd] bg-white/60 px-4 py-2 text-xs font-medium text-[#805468] shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#c78396] shadow-[0_0_10px_rgba(199,131,150,.7)]" />
              {t('home.badge')}
            </div>

            <h1 className="serif max-w-4xl text-6xl font-bold leading-[0.92] tracking-[-0.03em] text-[--plum] md:text-7xl lg:text-[88px]">
              {t('home.hero.l1')}
              <br />
              {t('home.hero.l2')}
              <br />
              <span className="italic text-[#a45b72]">{t('home.hero.l3')}</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#6b5a63] md:text-lg">
              {t('home.hero.text')}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="group relative overflow-hidden rounded-full bg-[#4b2638] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(75,38,56,.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#713b52] hover:shadow-[0_15px_35px_rgba(75,38,56,.28)]"
              >
                <span className="relative z-10">{t('home.hero.book')}</span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>

              <Link
                href="/masters"
                className="rounded-full border border-[#dbc8ce] bg-white/50 px-7 py-3.5 text-sm font-semibold text-[#513a44] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#c99baa] hover:bg-white hover:text-[#9b536b]"
              >
                {t('home.ourMasters')}
              </Link>
            </div>

            {/* Small stats */}
            <div className="mt-10 flex flex-wrap gap-8 border-t border-[#eadde1] pt-7">
              <div>
                <p className="serif text-3xl font-bold text-[#4b2638]">
                  10+
                </p>
                <p className="mt-1 text-xs text-[#88737b]">
                  {t('home.stats.pros')}
                </p>
              </div>

              <div>
                <p className="serif text-3xl font-bold text-[#4b2638]">
                  5★
                </p>
                <p className="mt-1 text-xs text-[#88737b]">
                  {t('home.stats.care')}
                </p>
              </div>

              <div>
                <p className="serif text-3xl font-bold text-[#4b2638]">
                  9–19
                </p>
                <p className="mt-1 text-xs text-[#88737b]">
                  {t('home.stats.daily')}
                </p>
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-[#ead0d7] via-transparent to-[#d9a0ad]/30 blur-2xl" />

            <div className="relative overflow-hidden rounded-[3rem] rounded-t-[14rem] border border-white/60 bg-white/40 p-2 shadow-[0_30px_80px_rgba(75,38,56,.15)] backdrop-blur-md">
              <img
                src="/ff.jfif"
                alt={t('home.hero.alt')}
                className="aspect-[3/4] w-full rounded-[2.5rem] rounded-t-[13rem] object-cover transition duration-700 hover:scale-[1.03]"
              />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-7 -left-5 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_15px_40px_rgba(75,38,56,.14)] backdrop-blur-xl sm:-left-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f2e1e6] text-lg">
                  ✦
                </div>

                <div>
                  <p className="text-xs text-[#917b84]">
                    {t('home.hero.cardLabel')}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[#4b2638]">
                    {t('home.hero.cardText')}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative circle */}
            <div className="absolute -right-5 top-16 flex h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-white/70 text-xl text-[#9e6176] shadow-lg backdrop-blur-md">
              ✿
            </div>
          </div>
        </div>
      </section>

      {/* MASTERS */}
      <section className="relative py-20">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a05c72]">
                {t('home.masters.eyebrow')}
              </p>

              <h2 className="serif text-5xl font-bold text-[--plum]">
                {t('home.ourMasters')}
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#76646c]">
                {t('home.masters.text')}
              </p>
            </div>

            <Link
              href="/masters"
              className="group text-sm font-semibold text-[#a05c72]"
            >
              {t('home.masters.all')}
              <span className="ml-2 transition group-hover:ml-3">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {masters.map((m) => (
              <div
                key={m.id}
                className="group transition duration-500 hover:-translate-y-2"
              >
                <MasterCard m={m} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative bg-[#f5edef] py-20">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#dca7b4]/20 blur-[100px]" />

        <div className="wrap relative">
          <div className="mb-10">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a05c72]">
              {t('home.services.eyebrow')}
            </p>

            <h2 className="serif text-5xl font-bold text-[--plum]">
              {t('home.services.title')}
            </h2>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 shadow-[0_15px_50px_rgba(75,38,56,.07)] backdrop-blur-xl">
            {services.slice(0, 4).map((s, index) => (
              <div
                key={s.id}
                className="group flex items-center justify-between border-b border-[#eadde1] px-6 py-6 transition-all duration-300 last:border-b-0 hover:bg-white/70 md:px-8"
              >
                <div className="flex items-center gap-5">
                  <span className="serif text-2xl text-[#c18a9a]">
                    0{index + 1}
                  </span>

                  <div>
                    <p className="font-medium text-[#4b2638]">
                      {t(`services.${s.id}`)}
                    </p>

                    <p className="mt-1 text-xs text-[#96838a]">
                      {t('home.services.sub')}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#f5e5e9] px-4 py-2 text-sm font-semibold text-[#9c526b] transition group-hover:bg-[#4b2638] group-hover:text-white">
                  {s.price} ₽
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="wrap py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a05c72]">
            {t('home.how.eyebrow')}
          </p>

          <h2 className="serif text-5xl font-bold text-[--plum]">
            {t('home.how.title')}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#76646c]">
            {t('home.how.text')}
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            t("home.how.s1"),
            t("home.how.s2"),
            t("home.how.s3"),
          ].map((text, i) => (
            <li
              key={text}
              className="group relative overflow-hidden rounded-[2rem] border border-[#eadde1] bg-white p-7 shadow-[0_10px_35px_rgba(75,38,56,.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(75,38,56,.1)]"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#f5e5e9] transition duration-500 group-hover:scale-125" />

              <div className="relative">
                <span className="serif text-6xl font-bold text-[#c28194]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="my-5 h-px w-10 bg-[#d9a0ad] transition-all duration-300 group-hover:w-20" />

                <p className="max-w-xs text-base font-medium leading-6 text-[#4b2638]">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FINAL CTA */}
      <section className="wrap pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#4b2638] px-7 py-14 text-center shadow-[0_25px_70px_rgba(75,38,56,.18)] md:px-12">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#d99aaa]/20 blur-[80px]" />

          <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-[#b66b83]/20 blur-[90px]" />

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d9aab7]">
              Lumière
            </p>

            <h2 className="serif mt-4 text-4xl font-bold text-white md:text-5xl">
              {t('home.cta.l1')}
              <br />
              {t('home.cta.l2')}
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#d8c4cb]">
              {t('home.cta.text')}
            </p>

            <Link
              href="/booking"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#4b2638] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#f9edef] hover:shadow-xl"
            >
              {t('home.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
