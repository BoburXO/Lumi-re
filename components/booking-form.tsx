'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { services, slots, roleLabel } from '@/lib/data'
export function BookingForm({ masters, master, service }: { masters: any[]; master?: number; service?: string }) {
  const { t } = useTranslation(), r = useRouter(), today = new Date().toISOString().slice(0, 10)
  const [f, setF] = useState({ master: master ?? masters[0]?.id, service: service ?? services[0].id, day: today, time: '', phone: '' })
  const [taken, setTaken] = useState<string[]>([]), [err, setErr] = useState(''), [busy, setBusy] = useState(false)
  useEffect(() => { if (f.master) fetch(`/api/bookings?master=${f.master}&day=${f.day}`).then((x) => x.json()).then(setTaken) }, [f.master, f.day])
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr('')
    const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, master: Number(f.master) }) })
    if (res.ok) { r.push('/account?ok=1'); r.refresh() } else { setErr((await res.json()).error || t('bookingForm.error')); setBusy(false) }
  }
  const set = (k: string, v: any) => setF((p) => ({ ...p, [k]: v, ...(k !== 'time' && k !== 'phone' ? { time: '' } : {}) }))
  return <form onSubmit={submit} className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(59,31,74,.5)] md:p-8">
    <label className="block text-sm">{t('bookingForm.master')}<select className="inp mt-1" value={f.master} onChange={(e) => set('master', e.target.value)}>{masters.map((m) => <option key={m.id} value={m.id}>{m.name} — {roleLabel(t, m.role)}</option>)}</select></label>
    <label className="block text-sm">{t('bookingForm.service')}<select className="inp mt-1" value={f.service} onChange={(e) => set('service', e.target.value)}>{services.map((s) => <option key={s.id} value={s.id}>{t(`services.${s.id}`)} — {s.price} ₽</option>)}</select></label>
    <label className="block text-sm">{t('bookingForm.date')}<input type="date" min={today} className="inp mt-1" value={f.day} onChange={(e) => set('day', e.target.value)} /></label>
    <div><p className="mb-2 text-sm">{t('bookingForm.time')}</p><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{slots.map((t) => <button type="button" key={t} disabled={taken.includes(t)} onClick={() => set('time', t)} className={`rounded-xl border py-2 text-sm disabled:line-through disabled:opacity-40 ${f.time === t ? 'border-[--plum] bg-[--plum] text-white' : 'border-[#e3d3d8]'}`}>{t}</button>)}</div></div>
    <label className="block text-sm">{t('bookingForm.phone')}<input required type="tel" placeholder="+998 90 123 45 67" className="inp mt-1" value={f.phone} onChange={(e) => set('phone', e.target.value)} /></label>
    {err && <p className="text-sm text-red-600">{err}</p>}
    <button disabled={busy || !f.time} className="btn w-full">{busy ? t('bookingForm.sending') : f.time ? t('bookingForm.submit') : t('bookingForm.chooseTime')}</button>
  </form>
}
