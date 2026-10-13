import ru from '@/locales/ru.json'
import uz from '@/locales/uz.json'
import en from '@/locales/en.json'
import { defaultLng, type Lng } from './settings'

export const resources = {
  ru: { translation: ru },
  uz: { translation: uz },
  en: { translation: en },
}

export const i18nOptions = (lng: Lng) => ({
  resources,
  lng,
  fallbackLng: defaultLng,
  supportedLngs: Object.keys(resources),
  interpolation: { escapeValue: false },
  nsSeparator: false as const, // чтобы ":" в названиях (например, должностей) не ломал ключи
  initAsync: false, // ресурсы встроены -> инициализация синхронная
  react: { useSuspense: false },
})
