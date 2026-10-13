import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/admin'
import { listAppointments } from '@/lib/db'
import { serviceLabel } from '@/lib/data'
import { getT } from '@/lib/i18n/server'
export const dynamic = 'force-dynamic'
export default async function Page({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const user = await getUser(), { t } = await getT()
  if (!user) redirect('/sign-in?next=/account')
  const list = await listAppointments(user.id), { ok } = await searchParams
  return <main className="wrap max-w-3xl py-14"><h1 className="serif text-5xl text-[--plum]">{t('account.title')}</h1>
    {ok && <p className="mt-4 rounded-2xl bg-[--blush] p-4">{t('account.sent')}</p>}
    <ul className="mt-8 space-y-3">{list.map((a) => <li key={a.id} className="flex flex-wrap justify-between gap-2 rounded-2xl bg-white p-5"><div><p className="font-semibold">{serviceLabel(t, a.service)}</p><p className="text-sm text-[#7a6670]">{a.master} · {t('account.when', { day: a.day, time: a.time })}</p></div><span className="text-sm text-[--rose]">{t(`statuses.${a.status}`, { defaultValue: a.status })}</span></li>)}</ul>
    {!list.length && <p className="mt-8 text-[#7a6670]">{t('account.empty')}</p>}<Link href="/booking" className="btn mt-8">{t('account.new')}</Link></main>
}
