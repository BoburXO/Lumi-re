import { getT } from '@/lib/i18n/server'
import { NextResponse } from 'next/server'
import { checkUser, createSession } from '@/lib/db'
export async function POST(req: Request) {
  const { t } = await getT()
  const b = await req.json().catch(() => null)
  const u = await checkUser(String(b?.email || '').trim().toLowerCase(), String(b?.password || ''))
  if (!u) return NextResponse.json({ error: t('errors.badLogin') }, { status: 401 })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('sid', await createSession(u.id), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
  return res
}
