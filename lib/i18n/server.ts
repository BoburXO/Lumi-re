import { cache } from 'react'
import { cookies, headers } from 'next/headers'
import { createInstance } from 'i18next'
import { cookieName, defaultLng, isLng, type Lng } from './settings'
import { i18nOptions } from './resources'

// Язык: cookie -> Accept-Language браузера -> ru
export async function getLng(): Promise<Lng> {
  const saved = (await cookies()).get(cookieName)?.value
  if (isLng(saved)) return saved
  const accept = (await headers()).get('accept-language') ?? ''
  for (const part of accept.split(',')) {
    const code = part.trim().slice(0, 2).toLowerCase()
    if (isLng(code)) return code
  }
  return defaultLng
}

// Функция перевода для серверных компонентов и API-роутов
export const getT = cache(async () => {
  const lng = await getLng()
  const i18n = createInstance()
  await i18n.init(i18nOptions(lng))
  return { t: i18n.getFixedT(lng), lng }
})
