import type { TFunction } from 'i18next'
import ru from '@/locales/ru.json'

// Названия услуг лежат в locales/*.json (services.<id>)
export const services = [
  { id: 'cut-w', price: 1800, min: 60 },
  { id: 'color', price: 4200, min: 120 },
  { id: 'cut-m', price: 1200, min: 45 },
  { id: 'beard', price: 900, min: 30 },
  { id: 'nails', price: 1600, min: 60 },
  { id: 'face', price: 2500, min: 75 },
]
export const slots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']
export const kindKeys = ['barber', 'hairdresser', 'nails', 'other']
export const statusKeys = ['new', 'confirmed', 'done', 'cancelled']

// { key: перевод } для списков/селектов
export const labelMap = (t: TFunction, prefix: string, keys: string[]) =>
  Object.fromEntries(keys.map((k) => [k, t(`${prefix}.${k}`)])) as Record<string, string>

// Старые записи хранили русское название услуги, новые хранят id
const legacyServices: Record<string, string> = Object.fromEntries(
  Object.entries(ru.services).map(([id, name]) => [name, id]),
)
export const serviceLabel = (t: TFunction, value: string) => {
  const id = services.some((s) => s.id === value) ? value : legacyServices[value]
  return id ? t(`services.${id}`) : value
}

// Должности мастеров вводит админ; известные переводим, остальные показываем как есть
export const roleLabel = (t: TFunction, role: string) => t(`roles.${role}`, { defaultValue: role })
