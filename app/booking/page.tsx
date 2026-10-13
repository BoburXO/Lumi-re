import { redirect } from 'next/navigation'
import { getUser } from '@/lib/admin'
import { listMasters } from '@/lib/db'
import { BookingForm } from '@/components/booking-form'
import { getT } from '@/lib/i18n/server'
export const dynamic = 'force-dynamic'
export default async function Page({ searchParams }: { searchParams: Promise<{ master?: string; service?: string }> }) {
  const sp = await searchParams, qs = new URLSearchParams(sp as Record<string, string>).toString()
  if (!(await getUser())) redirect(`/sign-in?next=${encodeURIComponent('/booking' + (qs ? '?' + qs : ''))}`)
  const masters = await listMasters(), { t } = await getT()
  return <main className="wrap max-w-xl py-14"><h1 className="serif mb-6 text-5xl text-[--plum]">{t('booking.title')}</h1>
    {masters.length ? <BookingForm masters={masters} master={sp.master ? Number(sp.master) : undefined} service={sp.service} /> : <p>{t('booking.noMasters')}</p>}</main>
}
