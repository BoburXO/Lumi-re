import Link from "next/link";

import { getUser } from "@/lib/admin";
import { SignOut } from "./sign-out";
import { LanguageSwitcher } from "./language-switcher";
import { getT } from "@/lib/i18n/server";

const nav = [
  ["/masters", "nav.masters"],
  ["/services", "nav.services"],
  ["/contacts", "nav.contacts"],
];

export async function Header() {
  const { t } = await getT();
  const user = await getUser().catch(() => null);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8d9dc]/70 bg-[#fcf8f8]/75 shadow-[0_8px_30px_rgba(75,38,56,0.05)] backdrop-blur-2xl">
      <div className="wrap flex h-[82px] items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#5a3044] via-[#7a4057] to-[#b67888] shadow-[0_8px_25px_rgba(90,48,68,0.25)] transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
            <span className="serif relative z-10 text-xl font-bold text-white">
              L
            </span>

            <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-white/20 blur-md" />
          </div>

          <div className="leading-none">
            <span className="serif block text-[27px] font-bold tracking-wide text-[#4b2638] transition-colors duration-300 group-hover:text-[#a75c73]">
              Lumière
            </span>

            <span className="mt-1 block text-[8px] font-medium uppercase tracking-[0.35em] text-[#a98b94]">
              Beauty & Care
            </span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-1 rounded-full border border-[#eadde1] bg-white/45 p-1.5 shadow-[0_5px_20px_rgba(75,38,56,0.04)] md:flex">
          {nav.map(([href, text]) => (
            <Link
              key={href}
              href={href}
              className="relative rounded-full px-5 py-2.5 text-[13px] font-medium text-[#5d4850] transition-all duration-300 hover:bg-white hover:text-[#9b536b] hover:shadow-[0_4px_15px_rgba(75,38,56,0.08)]"
            >
              {t(text)}
            </Link>
          ))}
        </nav>

        {/* ACCOUNT */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user ? (
            <>
              <Link
                href="/account"
                className="group hidden items-center gap-2 rounded-full border border-[#eadde1] bg-white/60 px-4 py-2.5 transition-all duration-300 hover:border-[#d6b4bf] hover:bg-white hover:shadow-md sm:flex"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f2e4e8] text-xs font-bold text-[#754357]">
                  {user.name?.charAt(0).toUpperCase()}
                </span>

                <span className="text-sm font-medium text-[#513a44] group-hover:text-[#9b536b]">
                  {user.name}
                </span>
              </Link>

              <SignOut />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-[#59434c] transition hover:text-[#a2546d] sm:block"
              >
                {t('auth.signIn')}
              </Link>

              <Link
                href="/sign-up"
                className="group relative overflow-hidden rounded-full bg-[#4b2638] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(75,38,56,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#713b52] hover:shadow-[0_12px_30px_rgba(75,38,56,0.28)]"
              >
                <span className="relative z-10">{t('auth.signUp')}</span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export async function Footer() {
  const { t } = await getT();
  return (
    <footer className="relative mx-4 mb-8 mt-24 overflow-hidden rounded-[3rem] bg-[#351b29] sm:mx-6 lg:mx-10 p-10">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#a95f78]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-[#d7a0ad]/10 blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8e5368]/10 blur-[90px]" />

      <div className="wrap relative py-16">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md transition duration-300 group-hover:scale-105">
                <span className="serif text-xl font-bold text-white">
                  L
                </span>
              </div>

              <div>
                <p className="serif text-3xl font-bold text-white">
                  Lumière
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.35em] text-[#cba9b4]">
                  Beauty & Care
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#c9b1b9]">
              {t('footer.tagline')}
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d99aaa] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d99aaa]" />
              </span>

              <span className="text-xs text-[#dfcbd1]">
                {t('footer.hours')}
              </span>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b88a99]">
              {t('footer.navigation')}
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href="/masters"
                className="group flex items-center gap-2 text-sm text-[#d5c1c8] transition hover:text-white"
              >
                <span className="h-px w-0 bg-[#d99aaa] transition-all duration-300 group-hover:w-5" />
                {t('nav.masters')}
              </Link>

              <Link
                href="/services"
                className="group flex items-center gap-2 text-sm text-[#d5c1c8] transition hover:text-white"
              >
                <span className="h-px w-0 bg-[#d99aaa] transition-all duration-300 group-hover:w-5" />
                {t('nav.services')}
              </Link>

              <Link
                href="/contacts"
                className="group flex items-center gap-2 text-sm text-[#d5c1c8] transition hover:text-white"
              >
                <span className="h-px w-0 bg-[#d99aaa] transition-all duration-300 group-hover:w-5" />
                {t('nav.contacts')}
              </Link>

              <Link
                href="/admin"
                className="group flex items-center gap-2 text-sm text-[#d5c1c8] transition hover:text-white"
              >
                <span className="h-px w-0 bg-[#d99aaa] transition-all duration-300 group-hover:w-5" />
                {t('nav.admin')}
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b88a99]">
              {t('footer.contact')}
            </p>

            <div className="space-y-4 text-sm text-[#d5c1c8]">
              <p className="transition hover:text-white">
                📍 {t('footer.location')}
              </p>

              <p className="transition hover:text-white">
                ✦ {t('footer.byAppointment')}
              </p>

              <p className="transition hover:text-white">
                ✉ hello@lumiere.uz
              </p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#a98e98] sm:flex-row">
          <p>
            {t('footer.rights')}
          </p>

          <p className="serif text-sm italic text-[#c3a5af]">
            {t('footer.motto')}
          </p>
        </div>
      </div>
    </footer>
  );
}