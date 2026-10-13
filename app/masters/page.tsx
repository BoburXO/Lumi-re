
import Link from 'next/link'
import { listMasters } from '@/lib/db'
import { kindKeys } from '@/lib/data'
import { getT } from '@/lib/i18n/server'
import { MasterCard } from '@/components/masters'

export const dynamic = 'force-dynamic'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>
}) {
  const { t } = await getT()
  const { kind } = await searchParams
  const currentKind = kind ?? ''

  const all = await listMasters()
  const list = currentKind ? all.filter((m) => m.kind === currentKind) : all

  // Подготавливаем список фильтров вместе со счетчиком мастеров
  const filterOptions = [
    { key: '', label: t('masters.all'), count: all.length },
    ...kindKeys.map((k) => ({
      key: k,
      label: t(`kinds.${k}`),
      count: all.filter((m) => m.kind === k).length,
    })),
  ]

  return (
    <main className="wrap relative min-h-screen py-14">
      {/* Декоративный темно-фиолетовый акцент на фоне */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-full max-w-3xl -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#2e0c2c]/10 via-[#3d123a]/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Заголовок */}
      <header className="mb-8">
        <h1 className="serif text-5xl font-bold tracking-tight text-[#2e0c2c]">
          {t('masters.title')}
        </h1>
        <p className="mt-2 text-[#684a62]">
          {t('masters.subtitle')}
        </p>
      </header>

      {/* Кнопки-фильтры */}
      <div className="my-6 flex flex-wrap gap-2.5">
        {filterOptions.map(({ key, label, count }) => {
          const isActive = currentKind === key
          const href = key ? `?kind=${key}` : '?'

          return (
            <Link
              key={key}
              href={href}
              scroll={false}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'border-[#2e0c2c] bg-[#2e0c2c] text-white shadow-md shadow-[#2e0c2c]/20'
                  : 'border-[#e3d3d8] bg-white/80 text-[#4a2e46] hover:border-[#3d123a] hover:bg-[#3d123a]/10 hover:text-[#2e0c2c]'
              }`}
            >
              <span>{label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#f3eaf1] text-[#5e2b5b]'
                }`}
              >
                {count}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Список мастеров */}
      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4 ">
          {list.map((m) => (
            <MasterCard key={m.id} m={m} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-[#d8c2d4] bg-[#fdf8fc] p-10 text-center">
          <p className="text-lg font-medium text-[#3d123a]">
            {t('masters.emptyTitle')}
          </p>
          <p className="mt-1 text-sm text-[#7a5e76]">
            {t('masters.emptyText')}
          </p>
          <Link
            href="?"
            scroll={false}
            className="mt-5 inline-block rounded-full bg-[#2e0c2c] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t('masters.showAll')}
          </Link>
        </div>
      )}
    </main>
  )
}

