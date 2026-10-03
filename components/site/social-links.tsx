import { AtSign, BriefcaseBusiness, CodeXml, Globe, Link as LinkIcon, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PublicSocialLink } from "@/server/db/queries/content";
import type { SocialIcon } from "@/shared/constants";

/** lucide-react ships no brand logos and custom SVGs are not allowed, so each platform maps to a generic icon. */
const ICONS: Record<SocialIcon, LucideIcon> = {
  github: CodeXml,
  linkedin: BriefcaseBusiness,
  whatsapp: MessageCircle,
  twitter: AtSign,
  email: Mail,
  website: Globe,
  other: LinkIcon,
};

type SocialLinksProps = {
  links: PublicSocialLink[];
  /** "icons" for compact header/footer use, "list" for the Contact page. */
  variant?: "icons" | "list";
  className?: string;
};

export function SocialLinks({ links, variant = "icons", className }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul role="list" className={cn(variant === "icons" ? "flex items-center gap-1" : "flex flex-col gap-3", className)}>
      {links.map((link) => {
        const Icon = ICONS[link.icon];
        return (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={variant === "icons" ? link.label : undefined}
              className={cn(
                "group inline-flex items-center gap-3 rounded-md text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50",
                variant === "icons" ? "p-2" : "text-base",
              )}
            >
              <Icon className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none" aria-hidden="true" />
              {variant === "list" && <span className="underline-offset-4 group-hover:underline">{link.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
