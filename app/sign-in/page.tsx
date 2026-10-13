
import { AuthForm } from "@/components/auth-form";
import { getT } from "@/lib/i18n/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const { t } = await getT();

  return (
    <main className="wrap flex min-h-screen items-center justify-center px-8 py-16">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#8b3a4a]">
            Luxe Beauty
          </p>

          <h1 className="serif mt-3 text-5xl font-semibold text-[#5a1828]">
            {t('authPage.signIn.title')}
          </h1>

          <div className="mx-auto mt-5 h-px w-24 bg-[#8b3a4a]" />

          <p className="mx-auto mt-5 max-w-lg text-[#765c63]">
            {t('authPage.signIn.text')}
          </p>
        </div>

        <div className="rounded-[32px] border border-[#e3c5cb] bg-[#fffafa] p-10 shadow-[0_20px_60px_rgba(91,24,40,0.10)] md:p-14">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <AuthForm
                mode="sign-in"
                next={next?.startsWith("/") ? next : "/"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

