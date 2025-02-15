"use client";

import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import { ExecProfiles } from "@/data/team";
import { FC } from "react";
import { useForm } from "react-hook-form";
import sendEmail from "@/utils/send-email";

export default function Sponsor() {
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
          <iframe
            title="Contact us form"
            className="border border-solid border-gray-400 w-full min-h-[1500px]"
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=C92AT4wzTE6KFJBEaWL3uMetWVcCpo5KtSmErSAZ7GlUM1JYMFNPNURWWENLSzFONE5ZWUlURzNZOC4u&embed=true"
          />
        </div>
      </div>
    </main>
  );
}
