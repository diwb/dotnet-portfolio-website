"use client";

import { Github, Linkedin, Mail, Copy } from "lucide-react";
import { siteConfig } from "@/data/profile";

export default function ContactPage() {
  async function copyEmail() {
    await navigator.clipboard.writeText(siteConfig.email);
  }

  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Contact</p>
        <h1 className="mt-2 text-4xl font-semibold">Static contact points</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          No backend form is required. A provider such as Formspree, Basin or Netlify Forms can be
          added later without changing the static export model.
        </p>
        <div className="mt-8 grid gap-4">
          <a
            className="glass inline-flex items-center gap-3 rounded-lg p-5"
            href={`mailto:${siteConfig.email}`}
          >
            <Mail /> {siteConfig.email}
          </a>
          <a
            className="glass inline-flex items-center gap-3 rounded-lg p-5"
            href={siteConfig.linkedin}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Linkedin /> LinkedIn
          </a>
          <a
            className="glass inline-flex items-center gap-3 rounded-lg p-5"
            href={siteConfig.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github /> GitHub
          </a>
          <button
            className="glass inline-flex items-center gap-3 rounded-lg p-5 text-left"
            onClick={copyEmail}
            type="button"
          >
            <Copy /> Copy email
          </button>
        </div>
      </div>
    </div>
  );
}
