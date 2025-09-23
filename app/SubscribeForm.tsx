'use client'
import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setMsg(res.ok ? 'Thanks! You’re subscribed.' : `Error: ${data.error}`)
    if (res.ok) setEmail('')
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 24 }}>
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ padding: 10, minWidth: 260 }}
      />
      <button type="submit" style={{ padding: 10, marginLeft: 8 }}>Notify me</button>
      {msg && <p style={{ marginTop: 8 }}>{msg}</p>}
    </form>
  )
}
