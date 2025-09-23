'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setMessage('Thanks! You are subscribed.');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Subscription failed.');
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 24, display: 'flex', gap: 8 }}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: 10, minWidth: 260, border: '1px solid #ccc', borderRadius: 6 }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '10px 16px',
          borderRadius: 6,
          border: 'none',
          background: '#1F6FDB',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        {status === 'loading' ? 'Saving…' : 'Notify me'}
      </button>

      {message && (
        <div
          style={{
            marginLeft: 8,
            alignSelf: 'center',
            color: status === 'success' ? 'green' : 'crimson'
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}
