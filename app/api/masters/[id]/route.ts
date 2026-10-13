import { NextResponse } from 'next/server'
import { getT } from '@/lib/i18n/server'
import { isAdmin } from '@/lib/admin'
import { deleteMaster } from '@/lib/db'
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { t } = await getT()
  if (!(await isAdmin())) return NextResponse.json({ error: t('errors.noAccess') }, { status: 401 })
  await deleteMaster(Number((await params).id))
  return NextResponse.json({ ok: true })
}
