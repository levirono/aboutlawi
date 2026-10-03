import type { Metadata } from "next";
import { SitePage } from "@/components/site/site-page";
import { pageMetadata } from "@/server/utils/seo";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("gallery");
}

export default function GalleryPage() {
  return <SitePage page="gallery" />;
}
