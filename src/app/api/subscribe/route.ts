import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const token = process.env.SANITY_API_WRITE_TOKEN;
    if (!token) {
      console.warn('SANITY_API_WRITE_TOKEN is missing. Simulating subscriber save.');
      return NextResponse.json({ success: true, simulated: true });
    }

    const writeClient = client.withConfig({ token });

    await writeClient.create({
      _type: 'subscriber',
      email,
      source: source || 'Website',
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscriber save error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
