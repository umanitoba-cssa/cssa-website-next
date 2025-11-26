"use client";

import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import sendEmail from "@/utils/send-email";


const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export type FormData = {
  name: string;
  email: string;
  message: string;
  recaptchaToken?: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const recaptchaTokenRef = useRef<string | null>(null);
  
  function onSubmit(data: FormData) {
    const dataWithToken = {
      ...data,
      recaptchaToken: recaptchaTokenRef.current || undefined,
    };
    sendEmail(dataWithToken);
    
    recaptchaTokenRef.current = null; // reset
  }
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    document.body.appendChild(script);

    (window as any).onRecaptchaSubmit = (token: string) => {
      recaptchaTokenRef.current = token;
      (document.getElementById("contact-form") as HTMLFormElement)?.requestSubmit();
    };
    // cleanup on unmount
    return () => {
      delete (window as any).onRecaptchaSubmit;
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [])
  
  return (
    <main className="flex flex-col">
      <PageHeader title="Contact Us" image="/img/backgrounds/contact.jpg" />
      <div className="container py-12 flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <BlockHeader title="Contact Email" />
          <p>
            If you'd like to get in touch by email, please contact us at{" "}
            <a
              className="text-cssa-gold hover:underline"
              href="mailto:cssa@umanitoba.ca"
            >
              cssa@umanitoba.ca
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <BlockHeader title="Contact Form" />
          <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <p>Name</p>
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-black"
              ></label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("name", { required: true })}
              />
            </div>
            <div className="mb-5">
              <p>Email Address</p>
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-black"
              ></label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-5">
              <p>Message</p>
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-black"
              ></label>
              <textarea
                rows={4}
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("message", { required: true })}
              ></textarea>
            </div>
            <div>
              <button className="g-recaptcha hover:shadow-form rounded-md bg-cssa-blue py-3 px-8 text-base font-semibold text-white outline-none"
                data-sitekey={siteKey}
                data-callback="onRecaptchaSubmit"
                data-action="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
