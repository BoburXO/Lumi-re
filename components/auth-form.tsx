'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
export function AuthForm({ mode, next }: { mode: 'sign-in' | 'sign-up'; next: string }) {
  const { t } = useTranslation(), r = useRouter(), [err, setErr] = useState(''), [busy, setBusy] = useState(false), up = mode === 'sign-up'
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr('')
    const d = new FormData(e.currentTarget)
    const res = await fetch(`/api/auth/${up ? 'register' : 'login'}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(d)) })
    if (res.ok) { r.push(next); r.refresh() } else { setErr((await res.json()).error || t('authForm.error')); setBusy(false) }
  }
  return <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(59,31,74,.5)]">
    <h1 className="serif text-4xl text-[--plum]">{up ? t('authForm.signUp.title') : t('authForm.signIn.title')}</h1>
    <p className="text-sm text-[#7a6670]">{up ? t('authForm.signUp.text') : t('authForm.signIn.text')}</p>
    {up && <input required name="name" placeholder={t('authForm.name')} className="inp" />}
    <input required type="email" name="email" placeholder="Email" className="inp" />
    <input required minLength={6} type="password" name="password" placeholder={t('authForm.password')} className="inp" />
    {err && <p className="text-sm text-red-600">{err}</p>}
    <button disabled={busy} className="btn w-full">{busy ? t('authForm.wait') : up ? t('authForm.create') : t('authForm.submitIn')}</button>
    <Link className="block text-center text-sm text-[--rose]" href={`${up ? '/sign-in' : '/sign-up'}?next=${encodeURIComponent(next)}`}>{up ? t('authForm.haveAccount') : t('authForm.noAccount')}</Link>
  </form>
}
