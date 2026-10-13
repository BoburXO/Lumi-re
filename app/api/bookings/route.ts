import { getT } from '@/lib/i18n/server'
import { NextResponse } from 'next/server'
import { getUser } from '@/lib/admin'
import { createAppointment, takenSlots } from '@/lib/db'
import { services, slots } from '@/lib/data'
export async function GET(req: Request) {
  const u = new URL(req.url)
  return NextResponse.json(await takenSlots(Number(u.searchParams.get('master')), u.searchParams.get('day') || ''))
}
export async function POST(req: Request) {
  const { t } = await getT()
  const user = await getUser()
  if (!user) return NextResponse.json({ error: t('errors.needLogin') }, { status: 401 })
  const b = await req.json().catch(() => null)
  const svc = services.find((s) => s.id === b?.service)
  if (!svc || !slots.includes(b?.time) || !/^\d{4}-\d{2}-\d{2}$/.test(b?.day || '') || !Number.isInteger(b?.master) || String(b?.phone || '').length < 7)
    return NextResponse.json({ error: t('errors.checkBooking') }, { status: 400 })
  const row = await createAppointment({ user_id: user.id, client_name: user.name, phone: String(b.phone).trim(), master_id: b.master, service: svc.id, day: b.day, time: b.time })
  return row ? NextResponse.json(row, { status: 201 }) : NextResponse.json({ error: t('errors.slotTaken') }, { status: 409 })
}
