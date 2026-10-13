'use client'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { cookieName, languages, type Lng } from '@/lib/i18n/settings'

export function LanguageSwitcher() {
  const router = useRouter()
  const { i18n } = useTranslation()

  function change(lng: Lng) {
    document.cookie = `${cookieName}=${lng}; path=/; max-age=31536000; samesite=lax`
    router.refresh()
  }

  return (
    <div className="flex items-center rounded-full border border-[#eadde1] bg-white/60 p-1 text-[11px] font-semibold">
      {languages.map((l) => {
        const active = i18n.language === l
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            onClick={() => change(l)}
            className={`rounded-full px-2.5 py-1.5 transition ${
              active ? 'bg-[#4b2638] text-white' : 'text-[#7a6670] hover:text-[#9b536b]'
            }`}
          >
            {l.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
