"use client";

import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import { ExecProfiles } from "@/data/team";
import { FC } from "react";
import { useForm } from "react-hook-form";
import sendEmail from "@/utils/send-email";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <button className="hover:shadow-form rounded-md bg-cssa-blue py-3 px-8 text-base font-semibold text-white outline-none">
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
