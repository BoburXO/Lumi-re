"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
export default function Page() {
  const { t } = useTranslation(),
    r = useRouter(),
    [pin, setPin] = useState(""),
    [err, setErr] = useState("");
  async function go(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      r.push("/admin");
      r.refresh();
    } else {
      setErr(t("admin.pin.wrong"));
      setPin("");
    }
  }
  return (
    <main className="grid min-h-[70vh] place-items-center p-5">
      <form
        onSubmit={go}
        className="w-full max-w-xs space-y-4 rounded-3xl bg-white p-8 text-center shadow-[0_20px_60px_-30px_rgba(59,31,74,.5)]"
      >
        <h1 className="serif text-4xl text-[--plum]">{t('admin.pin.title')}</h1>
        <p className="text-sm text-[#7a6670]">{t('admin.pin.enter')}</p>
        <input
          autoFocus
          required
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="inp text-center text-2xl tracking-[.5em]"
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="btn w-full">{t('admin.pin.login')}</button>
      </form>
    </main>
  );
}
