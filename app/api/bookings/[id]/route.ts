import { getT } from '@/lib/i18n/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'
import { setStatus } from '@/lib/db'
import { statusKeys } from '@/lib/data'
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { t } = await getT()
  if (!(await isAdmin())) return NextResponse.json({ error: t('errors.noAccess') }, { status: 401 })
  const { status } = await req.json().catch(() => ({}))
  if (!statusKeys.includes(status)) return NextResponse.json({ error: t('errors.badStatus') }, { status: 400 })
  await setStatus(Number((await params).id), status)
  return NextResponse.json({ ok: true })
}
