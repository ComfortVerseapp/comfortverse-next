import { NextResponse } from 'next/server'; import { supabase } from '../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // insert into Supabase (table: subscribers)
    const { error } = await supabase
      .from('subscribers')
      .insert({ email });

    if (error) {
      // Postgres unique violation = 23505
      if ((error as any).code === '23505') {
        return NextResponse.json({ error: 'That email is already subscribed.' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
