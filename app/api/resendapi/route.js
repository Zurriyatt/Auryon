// app/api/send/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const {name , email , help} = body;
   
    const { data, error } = await resend.emails.send({
      from: `Contact Form <onboarding@resend.dev>`,
      to: ['auryonweb@gmail.com'] , // Change to your recipient
      subject:'New Message from ${name}',
      reply_to: email,
      html: `<div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #333;">New Help Request</h2>
      <p><strong>User Name:</strong> ${name}</p>
      <p><strong>User Email:</strong> ${email}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${help}</p>
    </div>`,
    });

    if (error) {

      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}