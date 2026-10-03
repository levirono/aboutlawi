import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; children: ReactNode };

export const isExternalHref = (href: string) => /^(https?:|mailto:)/.test(href);

/** Internal paths use client navigation; external links open in a new tab safely. */
export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
