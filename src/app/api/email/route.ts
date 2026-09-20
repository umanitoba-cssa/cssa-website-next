import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
    email: z
        .string()
        .email()
        .max(254)
        .transform((value: string) => value.trim().toLowerCase()),
    name: z
        .string()
        .min(1)
        .max(100)
        // remove CRLF
        .transform((value: string) => value.trim().replace(/[\r\n]+/g, ' ')),
    message: z
        .string()
        .min(1)
        .max(5000)
        .transform((value: string) => value.trim()),
    recaptchaToken: z
        .string()
        .min(1)
        .transform((value: string) => value.trim()),
});

export const dynamic = 'force-dynamic'; // so emails are sent every time, never cached

export async function POST(request: NextRequest) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
        return NextResponse.json(
            { error: 'Missing or invalid fields', details: result.error.format() },
            { status: 400 },
        );
    }

    const { email, name, message, recaptchaToken } = result.data;

    // Verify reCAPTCHA token
    const params = new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY ?? '',
        response: recaptchaToken,
    });

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    });

    const { success } = await res.json();
    if (!success) {
        return NextResponse.json({ error: 'reCAPTCHA validation failed' }, { status: 400 });
    }

    // Configure Nodemailer
    const transport = nodemailer.createTransport({
        host: 'mail.smtp2go.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        await transport.sendMail({
            from: '"CSSA Website Contact Form" <website@umanitobacssa.ca>',
            to: '"CSSA" <cssa@umanitoba.ca>',
            replyTo: email,
            cc: email, //(uncomment this line if you want to send a copy to the sender)
            subject: `Message from ${name} (${email})`,
            text: message,
        });

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (err) {
        console.error('Nodemailer Error:', err);
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}
