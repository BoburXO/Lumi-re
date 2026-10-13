'use client'
import { useMemo, type ReactNode } from 'react'
import { createInstance } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { i18nOptions } from '@/lib/i18n/resources'
import type { Lng } from '@/lib/i18n/settings'

export function I18nProvider({ lng, children }: { lng: Lng; children: ReactNode }) {
  const i18n = useMemo(() => {
    const instance = createInstance()
    instance.init(i18nOptions(lng))
    return instance
  }, [lng])
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
