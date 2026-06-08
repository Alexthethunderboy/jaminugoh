import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { client } from '@/sanity/lib/client';
import { globalSettingsQuery } from '@/sanity/lib/queries';

// We instantiate Resend without an API key initially just so it compiles,
// but it requires process.env.RESEND_API_KEY to actually send.
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Fetch the target email from Sanity, fallback to the user's explicit email
    const settings = await client.fetch(globalSettingsQuery);
    const targetEmail = settings?.email || 'Benjaminugoh@gmail.com';

    if (!process.env.RESEND_API_KEY) {
      // If no API key is provided, just simulate a successful request for demonstration purposes
      console.log('Simulated Email Send:', { name, email, message, to: targetEmail });
      return NextResponse.json({ success: true, simulated: true });
    }

    const data = await resend.emails.send({
      from: 'Jamin Studio <onboarding@resend.dev>',
      to: [targetEmail],
      replyTo: email,
      subject: `New Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #f3f4f6; padding: 40px; border-radius: 4px; border: 1px solid #333;">
          <h2 style="color: #ffffff; font-weight: normal; font-size: 16px; border-bottom: 1px solid #333; padding-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; margin-top: 0;">
            New Inquiry
          </h2>
          
          <div style="margin-top: 30px; font-size: 14px;">
            <p style="margin: 5px 0; color: #9ca3af;"><strong>Name:</strong> <span style="color: #ffffff;">${name}</span></p>
            <p style="margin: 5px 0; color: #9ca3af;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></p>
          </div>
          
          <div style="background-color: #111111; padding: 24px; border-left: 2px solid #ffffff; margin-top: 30px; line-height: 1.6; font-size: 14px; color: #d1d5db; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</div>
        </div>
      `,
    });

    // Resend returns an error object inside data if it fails, but doesn't necessarily throw
    if (data.error) {
      console.error('Resend API Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    console.log('Resend Success:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Contact Form Server Error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
