import { getT } from '@/lib/i18n/server'
import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'
import { addMaster, listMasters } from '@/lib/db'
export async function GET() { return NextResponse.json(await listMasters()) }
export async function POST(req: Request) {
  const { t } = await getT()
  if (!(await isAdmin())) return NextResponse.json({ error: t('errors.noAccess') }, { status: 401 })
  const b = await req.json().catch(() => null)
  if (!b?.name || !b?.role || !b?.kind || !(Number(b.price) > 0)) return NextResponse.json({ error: t('errors.fillMaster') }, { status: 400 })
  return NextResponse.json(await addMaster({ name: String(b.name).trim(), role: String(b.role).trim(), kind: b.kind, price: Number(b.price), photo: String(b.photo || '') }), { status: 201 })
}
