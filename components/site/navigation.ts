import { PAGE_LABELS, PAGE_PATHS, type Page } from "@/shared/constants";

/** Primary navigation. Defined in code, as the prompt allows. */
const NAV_PAGES: Page[] = ["projects", "skills", "achievements", "gallery", "about", "contact"];

export const NAV_LINKS = NAV_PAGES.map((page) => ({ href: PAGE_PATHS[page], label: PAGE_LABELS[page] }));
