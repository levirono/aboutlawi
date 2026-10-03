import type { Metadata } from "next";
import { SitePage } from "@/components/site/site-page";
import { pageMetadata } from "@/server/utils/seo";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("about");
}

export default function AboutPage() {
  return <SitePage page="about" />;
}
