export const languages = ['ru', 'uz', 'en'] as const
export type Lng = (typeof languages)[number]
export const defaultLng: Lng = 'ru'
export const cookieName = 'lng'
export const isLng = (v?: string | null): v is Lng => !!v && (languages as readonly string[]).includes(v)
