import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteSession } from '@/lib/db'
export async function POST() {
  const t = (await cookies()).get('sid')?.value
  if (t) await deleteSession(t)
  const res = NextResponse.json({ ok: true }); res.cookies.delete('sid'); return res
}
