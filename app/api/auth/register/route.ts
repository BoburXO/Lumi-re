import { getT } from '@/lib/i18n/server'
import { NextResponse } from 'next/server'
import { createSession, createUser } from '@/lib/db'
export async function POST(req: Request) {
  const { t } = await getT()
  const b = await req.json().catch(() => null), email = String(b?.email || '').trim().toLowerCase()
  if (!b?.name || !/^\S+@\S+\.\S+$/.test(email) || String(b.password || '').length < 6) return NextResponse.json({ error: t('errors.registerInvalid') }, { status: 400 })
  const u = await createUser(String(b.name).trim(), email, String(b.password))
  if (!u) return NextResponse.json({ error: t('errors.emailTaken') }, { status: 409 })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('sid', await createSession(u.id), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return res
}
