import { promises as fs } from 'fs'
import path from 'path'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
type DB = { masters: any[]; appointments: any[]; users: any[]; sessions: any[]; seq: number }
const file = path.join(process.cwd(), 'data', 'db.json')
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`
const seed = (): DB => ({ seq: 10, users: [], sessions: [], appointments: [], masters: [
  { id: 1, name: 'Анна Морозова', role: 'Парикмахер-стилист', kind: 'hairdresser', price: 3200, photo: img('photo-1580618672591-eb180b1a973f') },
  { id: 2, name: 'Алексей Смирнов', role: 'Барбер', kind: 'barber', price: 1800, photo: img('photo-1621605815971-fbc98d665033') },
  { id: 3, name: 'Ольга Воронова', role: 'Колорист', kind: 'hairdresser', price: 4500, photo: img('photo-1595476108010-b4d1f102b1b1') },
  { id: 4, name: 'Мария Белова', role: 'Мастер маникюра', kind: 'nails', price: 2200, photo: img('photo-1604654894610-df63bc536371') },
] })
export async function read(): Promise<DB> { try { return JSON.parse(await fs.readFile(file, 'utf8')) } catch { return seed() } }
let queue: Promise<unknown> = Promise.resolve()
export function update<T>(fn: (db: DB) => T): Promise<T> {
  const run = queue.then(async () => { const db = await read(); const out = fn(db); await fs.mkdir(path.dirname(file), { recursive: true }); await fs.writeFile(file, JSON.stringify(db, null, 2)); return out })
  queue = run.catch(() => {}); return run
}
export const listMasters = async () => (await read()).masters
export async function listAppointments(userId?: string) {
  const db = await read()
  return db.appointments.filter((a) => !userId || a.user_id === userId).map((a) => ({ ...a, master: db.masters.find((m) => m.id === a.master_id)?.name ?? '—' }))
    .sort((a, b) => (b.day + b.time).localeCompare(a.day + a.time))
}
export async function listClients() {
  const db = await read()
  return db.users.map((u) => ({ id: u.id, name: u.name, email: u.email, created: u.created, visits: db.appointments.filter((a) => a.user_id === u.id).length })).reverse()
}
export const takenSlots = async (master: number, day: string) => (await read()).appointments.filter((a) => a.master_id === master && a.day === day && a.status !== 'cancelled').map((a) => a.time as string)
export const addMaster = (m: { name: string; role: string; kind: string; price: number; photo: string }) => update((db) => { const x = { id: ++db.seq, ...m }; db.masters.push(x); return x })
export const deleteMaster = (id: number) => update((db) => { db.masters = db.masters.filter((m) => m.id !== id) })
export const setStatus = (id: number, status: string) => update((db) => { const a = db.appointments.find((x) => x.id === id); if (a) a.status = status })
export const createAppointment = (a: { user_id: string; client_name: string; phone: string; master_id: number; service: string; day: string; time: string }) => update((db) => {
  if (db.appointments.some((x) => x.master_id === a.master_id && x.day === a.day && x.time === a.time && x.status !== 'cancelled')) return null
  const row = { id: ++db.seq, ...a, status: 'new', created_at: new Date().toISOString() }; db.appointments.push(row); return row
})
const hash = (pw: string, salt: string) => scryptSync(pw, salt, 32).toString('hex')
export const createUser = (name: string, email: string, password: string) => update((db) => {
  if (db.users.some((u) => u.email === email)) return null
  const salt = randomBytes(16).toString('hex'), u = { id: 'u' + ++db.seq, name, email, salt, hash: hash(password, salt), created: new Date().toISOString() }; db.users.push(u); return u
})
export async function checkUser(email: string, password: string) {
  const u = (await read()).users.find((x) => x.email === email)
  return u && timingSafeEqual(Buffer.from(u.hash), Buffer.from(hash(password, u.salt))) ? u : null
}
export const createSession = (userId: string) => update((db) => { const token = randomBytes(32).toString('hex'); db.sessions.push({ token, userId }); return token })
export const deleteSession = (token: string) => update((db) => { db.sessions = db.sessions.filter((s) => s.token !== token) })
export async function userByToken(token?: string) {
  if (!token) return null
  const db = await read(), s = db.sessions.find((x) => x.token === token), u = s && db.users.find((x) => x.id === s.userId)
  return u ? { id: u.id as string, name: u.name as string, email: u.email as string } : null
}
