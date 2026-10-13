import { getT } from '@/lib/i18n/server'
import { NextResponse } from 'next/server'
import { adminToken, pin } from '@/lib/admin'
export async function POST(req: Request) {
  const { t } = await getT()
  const { pin: p } = await req.json().catch(() => ({}))
  if (String(p) !== pin()) return NextResponse.json({ error: t('errors.wrongPin') }, { status: 401 })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin', adminToken(), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 })
  return res
}
export async function DELETE() { const res = NextResponse.json({ ok: true }); res.cookies.delete('admin'); return res }
