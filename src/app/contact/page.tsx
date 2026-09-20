'use client';

import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import sendEmail from '@/utils/send-email';

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export type FormData = {
    name: string;
    email: string;
    message: string;
    recaptchaToken?: string;
};

const Contact: FC = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Load reCAPTCHA script with explicit render mode
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            setIsSubmitting(true);

            if (typeof window === 'undefined' || !(window as any).grecaptcha) {
                alert('reCAPTCHA script has not loaded yet.');
                return;
            }

            const token = await new Promise<string>((resolve, reject) => {
                (window as any).grecaptcha.ready(() => {
                    (window as any).grecaptcha
                        .execute(siteKey, { action: 'submit' })
                        .then(resolve)
                        .catch(reject);
                });
            });

            const payload = { ...data, recaptchaToken: token };
            await sendEmail(payload); // Throws an error if !res.ok

            reset();
            alert('Message sent successfully!'); // Single success alert
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Contact Us"
                image="/img/backgrounds/contact.jpg"
            />
            <div className="container py-12 flex flex-col gap-12">
                <div
                    id="contact-email"
                    className="flex flex-col gap-8">
                    <BlockHeader title="Contact Email" />
                    <p>
                        If you&apos;d like to get in touch by email, please contact us at{' '}
                        <a
                            className="text-cssa-gold hover:underline"
                            href="mailto:cssa@umanitoba.ca">
                            cssa@umanitoba.ca
                        </a>
                    </p>
                </div>
                <div
                    id="contact-form"
                    className="flex flex-col gap-8">
                    <BlockHeader title="Contact Form" />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-xl">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                                {...register('name', { required: true })}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-3 block text-xl">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="example@domain.com"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                                {...register('email', { required: true })}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="message"
                                className="mb-3 block text-xl">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Type your message"
                                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                                {...register('message', { required: true })}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="hover:shadow-form rounded-md bg-cssa-blue py-3 px-8 text-base font-semibold text-white outline-none disabled:opacity-50">
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Contact;
