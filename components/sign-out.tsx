'use client'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
export function SignOut() {
  const r = useRouter(), { t } = useTranslation()
  return <button className="text-[#7a6670] hover:text-[--rose]" onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); r.push('/'); r.refresh() }}>{t('auth.signOut')}</button>
}
