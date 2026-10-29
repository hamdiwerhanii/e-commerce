import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

import { Logo } from "@/shared/components/Logo";
import { FOOTER_LINKS } from "@/shared/constants/navigation";
import { SITE } from "@/shared/constants/site";

export const Footer = () => (
  <footer className="mx-4 mb-6 rounded-3xl bg-sky-50 px-6 py-10 sm:mx-10 sm:px-14">
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Logo />
        <address className="mt-5 space-y-1 text-navy not-italic">
          <p>Our address:</p>
          {SITE.address.map((line) => (
            <p key={line} className="font-bold">
              {line}
            </p>
          ))}
          <p className="pt-3">24/7 free call:</p>
          <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="font-bold hover:text-brand">
            {SITE.phone}
          </a>
        </address>
      </div>

      {FOOTER_LINKS.map((group) => (
        <nav key={group.title} aria-label={group.title}>
          <h2 className="mb-6 text-2xl font-bold text-navy">{group.title}</h2>
          <ul className="space-y-3">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="flex items-center gap-1 text-slate-500 hover:text-brand">
                  <ChevronRight aria-hidden className="size-4" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>

    <p className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
      &copy; {new Date().getFullYear()} {SITE.name}. Demo store built by{" "}
      <a href={SITE.author.url} target="_blank" rel="noreferrer" className="font-semibold text-navy hover:text-brand">
        {SITE.author.name}
      </a>
      .
    </p>
  </footer>
);
