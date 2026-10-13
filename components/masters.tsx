import Link from 'next/link'
import { roleLabel } from '@/lib/data'
import { getT } from '@/lib/i18n/server'
export async function MasterCard({ m }: { m: any }) {
  const { t } = await getT()
  return <article className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_-35px_rgba(59,31,74,.6)]">
    <div className="aspect-[4/5] overflow-hidden bg-[--blush]">{m.photo && <img src={m.photo} alt={m.name} className="size-full object-cover" />}</div>
    <div className="p-5"><p className="text-xs text-[--rose]">{t(`kinds.${m.kind}`, { defaultValue: m.kind })}</p><h3 className="serif text-2xl text-[--plum]">{m.name}</h3><p className="text-sm text-[#7a6670]">{roleLabel(t, m.role)} · {t('masters.priceFrom', { price: m.price })}</p>
      <Link href={`/booking?master=${m.id}`} className="btn ghost mt-4 w-full">{t('masters.book')}</Link></div>
  </article>
}
