/**
 * Seeds realistic placeholder content for every table so the site and dashboard
 * render during testing. Replace it later through the admin panel.
 *
 *   npm run db:seed
 *
 * Reads DATABASE_URL, the seed admin credentials and the Cloudinary keys from .env.
 * Re-running is safe: content tables are cleared and refilled; the admin is upserted.
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import * as schema from "./schema";
import { parseEnv, seedEnvSchema } from "../env.schema";
import { hashPassword } from "../utils/password";

const env = parseEnv(
  seedEnvSchema.extend({
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
  }),
  process.env,
);

const db = drizzle({ client: neon(env.DATABASE_URL), schema });

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

/** Copies a public Cloudinary demo image into this account under portfolio/seed/. */
async function seedImage(source: string, name: string) {
  const result = await cloudinary.uploader.upload(`https://res.cloudinary.com/demo/image/upload/${source}.jpg`, {
    public_id: `portfolio/seed/${name}`,
    overwrite: true,
    resource_type: "image",
  });
  return { imageUrl: result.secure_url, imagePublicId: result.public_id };
}

async function main() {
  console.info("Uploading seed images to Cloudinary…");
  const [hero, about, p1, p2, p3, p4, g1, g2, g3, g4, g5, g6, award] = await Promise.all([
    seedImage("cld-sample", "hero"),
    seedImage("woman", "about"),
    seedImage("cld-sample-2", "project-ledger"),
    seedImage("cld-sample-3", "project-transit"),
    seedImage("cld-sample-4", "project-harvest"),
    seedImage("cld-sample-5", "project-docs"),
    seedImage("mountain", "gallery-mountain"),
    seedImage("horses", "gallery-horses"),
    seedImage("bike", "gallery-bike"),
    seedImage("couple", "gallery-meetup"),
    seedImage("dog", "gallery-office-dog"),
    seedImage("sample", "gallery-flowers"),
    seedImage("lady", "achievement-award"),
  ]);

  console.info("Clearing content tables…");
  await db.batch([
    db.delete(schema.pageSections),
    db.delete(schema.pageMeta),
    db.delete(schema.siteSettings),
    db.delete(schema.projects),
    db.delete(schema.skills),
    db.delete(schema.achievements),
    db.delete(schema.galleryItems),
    db.delete(schema.socialLinks),
    db.delete(schema.contactMessages),
  ]);

  console.info("Seeding admin…");
  const passwordHash = await hashPassword(env.SEED_ADMIN_PASSWORD);
  await db
    .insert(schema.admins)
    .values({ email: env.SEED_ADMIN_EMAIL.toLowerCase(), passwordHash })
    .onConflictDoUpdate({ target: schema.admins.email, set: { passwordHash } });

  console.info("Seeding content…");
  await db.batch([
    db.insert(schema.siteSettings).values({
      id: 1,
      siteName: "Alex Kamau",
      ownerName: "Alex Kamau",
      seoTitle: "Alex Kamau — Full-stack developer",
      seoDescription: "Full-stack developer building fast, accessible web products with TypeScript, Next.js and Postgres.",
      ogImageUrl: hero.imageUrl,
      ogImagePublicId: hero.imagePublicId,
    }),

    db.insert(schema.pageMeta).values([
      { page: "home", title: "Alex Kamau — Full-stack developer", description: "Projects, skills and writing by Alex Kamau." },
      { page: "projects", title: "Projects", description: "Selected work across product, data and infrastructure." },
      { page: "skills", title: "Skills", description: "Languages, frameworks and tools I use every day." },
      { page: "achievements", title: "Achievements", description: "Awards, certifications and milestones." },
      { page: "gallery", title: "Gallery", description: "Moments from talks, meetups and the workshop." },
      { page: "about", title: "About", description: "Background, approach and what I am working on now." },
      { page: "contact", title: "Contact", description: "Get in touch about a project or role." },
    ]),

    db.insert(schema.pageSections).values([
      // Home
      {
        page: "home", key: "hero", type: "hero", position: 0,
        title: "I build calm, fast software for the web.",
        body: "Full-stack developer in Nairobi. I turn messy problems into simple products with TypeScript, Next.js and Postgres.",
        ...hero, imageAlt: "Abstract landscape in soft light",
        ctaLabel: "See my work", ctaHref: "/projects",
        secondaryCtaLabel: "Get in touch", secondaryCtaHref: "/contact",
      },
      { page: "home", key: "featured-projects", type: "featured_projects", position: 1, title: "Selected work", subtitle: "A few projects I am proud of.", ctaLabel: "All projects", ctaHref: "/projects", itemLimit: 3 },
      { page: "home", key: "skills", type: "skills_summary", position: 2, title: "What I work with", subtitle: "Tools I reach for first.", ctaLabel: "All skills", ctaHref: "/skills", itemLimit: 8 },
      { page: "home", key: "achievements", type: "achievements_highlights", position: 3, title: "Milestones", ctaLabel: "All achievements", ctaHref: "/achievements", itemLimit: 3 },
      { page: "home", key: "gallery", type: "gallery_preview", position: 4, title: "Around the work", ctaLabel: "Open gallery", ctaHref: "/gallery", itemLimit: 4 },
      { page: "home", key: "contact-cta", type: "contact_cta", position: 5, title: "Have a project in mind?", body: "I am open to freelance work and full-time roles.", ctaLabel: "Start a conversation", ctaHref: "/contact" },

      // Projects
      { page: "projects", key: "header", type: "page_header", position: 0, title: "Projects", subtitle: "Selected work across product, data and infrastructure." },
      { page: "projects", key: "list", type: "item_list", position: 1 },
      { page: "projects", key: "empty", type: "empty_state", position: 2, title: "Projects are on their way." },

      // Skills
      { page: "skills", key: "header", type: "page_header", position: 0, title: "Skills", subtitle: "Grouped by where they fit in the stack." },
      { page: "skills", key: "list", type: "item_list", position: 1 },
      { page: "skills", key: "empty", type: "empty_state", position: 2, title: "Skills will be listed soon." },

      // Achievements
      { page: "achievements", key: "header", type: "page_header", position: 0, title: "Achievements", subtitle: "Awards, certifications and milestones." },
      { page: "achievements", key: "list", type: "item_list", position: 1 },
      { page: "achievements", key: "empty", type: "empty_state", position: 2, title: "Nothing here yet." },

      // Gallery
      { page: "gallery", key: "header", type: "page_header", position: 0, title: "Gallery", subtitle: "Talks, meetups and the workshop." },
      { page: "gallery", key: "list", type: "item_list", position: 1 },
      { page: "gallery", key: "empty", type: "empty_state", position: 2, title: "Photos coming soon." },

      // About
      { page: "about", key: "header", type: "page_header", position: 0, title: "About", subtitle: "Developer, mentor, occasional speaker." },
      {
        page: "about", key: "story", type: "rich_text", position: 1,
        title: "Background",
        body: "I have spent eight years building web products for fintech, logistics and agritech teams across East Africa.\n\nI care about clear interfaces, honest data models and code that the next person can read. Most of my work today is in TypeScript, React and Postgres.",
        ...about, imageAlt: "Portrait of Alex Kamau",
      },
      { page: "about", key: "now", type: "rich_text", position: 2, title: "Now", body: "Building an open-source invoicing toolkit and mentoring junior developers at a local bootcamp." },
      { page: "about", key: "contact-cta", type: "contact_cta", position: 3, title: "Want to work together?", ctaLabel: "Contact me", ctaHref: "/contact" },

      // Contact
      { page: "contact", key: "header", type: "page_header", position: 0, title: "Contact", subtitle: "Tell me about your project. I reply within two working days." },
      { page: "contact", key: "form", type: "contact_form", position: 1, title: "Send a message" },
      { page: "contact", key: "social", type: "social_links", position: 2, title: "Elsewhere" },
    ]),

    db.insert(schema.projects).values([
      { slug: "ledger-lite", title: "Ledger Lite", summary: "Bookkeeping for small shops, built for slow networks and shared phones.", body: "Ledger Lite helps market traders record sales and stock offline and sync when a connection returns.\n\nI led the front end and the sync engine, cutting failed syncs by 90%.", ...p1, imageAlt: "Ledger Lite dashboard", repoUrl: "https://github.com/example/ledger-lite", liveUrl: "https://example.com/ledger-lite", tags: ["Next.js", "Postgres", "Offline-first"], featured: true, position: 0 },
      { slug: "transit-board", title: "Transit Board", summary: "Live matatu arrival times from crowd-sourced GPS pings.", body: "A real-time board that aggregates GPS pings from drivers and riders to estimate arrival times on busy routes.", ...p2, imageAlt: "Transit Board map view", repoUrl: "https://github.com/example/transit-board", tags: ["TypeScript", "WebSockets", "Maps"], featured: true, position: 1 },
      { slug: "harvest-watch", title: "Harvest Watch", summary: "Crop-price alerts for farmers over SMS and the web.", body: "Harvest Watch collects market prices daily and alerts farmers when prices cross their target.", ...p3, imageAlt: "Harvest Watch price chart", liveUrl: "https://example.com/harvest-watch", tags: ["Node.js", "SMS", "Drizzle"], featured: true, position: 2 },
      { slug: "docs-kit", title: "Docs Kit", summary: "A small, fast documentation theme for open-source projects.", ...p4, imageAlt: "Docs Kit page layout", repoUrl: "https://github.com/example/docs-kit", tags: ["React", "MDX"], featured: false, position: 3 },
    ]),

    db.insert(schema.skills).values([
      { name: "TypeScript", category: "Languages", featured: true, position: 0 },
      { name: "SQL", category: "Languages", featured: true, position: 1 },
      { name: "Python", category: "Languages", position: 2 },
      { name: "React", category: "Frontend", featured: true, position: 3 },
      { name: "Next.js", category: "Frontend", featured: true, position: 4 },
      { name: "Tailwind CSS", category: "Frontend", featured: true, position: 5 },
      { name: "Node.js", category: "Backend", featured: true, position: 6 },
      { name: "PostgreSQL", category: "Backend", featured: true, position: 7 },
      { name: "Drizzle ORM", category: "Backend", position: 8 },
      { name: "Docker", category: "Tooling", featured: true, position: 9 },
      { name: "GitHub Actions", category: "Tooling", position: 10 },
    ]),

    db.insert(schema.achievements).values([
      { title: "Best Fintech Product", issuer: "Nairobi Tech Week", description: "Ledger Lite won the fintech category out of 120 entries.", achievedOn: "2025-06-14", ...award, imageAlt: "Award ceremony", featured: true, position: 0 },
      { title: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", achievedOn: "2024-03-02", url: "https://example.com/credential", featured: true, position: 1 },
      { title: "Speaker, JSConf Africa", issuer: "JSConf Africa", description: "Talk: Designing for slow networks.", achievedOn: "2023-10-20", featured: true, position: 2 },
      { title: "Open-source maintainer", issuer: "Docs Kit", description: "Maintained a docs theme used by 300+ projects.", achievedOn: "2022-08-01", position: 3 },
    ]),

    db.insert(schema.galleryItems).values([
      { title: "Weekend hike", caption: "Clearing my head before a launch.", ...g1, imageAlt: "Mountain range at dusk", featured: true, position: 0 },
      { title: "Field visit", caption: "User interviews with farmers in Nakuru.", ...g2, imageAlt: "Horses in a field", featured: true, position: 1 },
      { title: "Commute", ...g3, imageAlt: "Bicycle parked on a street", featured: true, position: 2 },
      { title: "Meetup", caption: "Co-hosting the monthly TypeScript meetup.", ...g4, imageAlt: "Two people talking at an event", featured: true, position: 3 },
      { title: "Office dog", ...g5, imageAlt: "A dog resting in the office", position: 4 },
      { title: "Studio", ...g6, imageAlt: "Flowers on a desk", position: 5 },
    ]),

    db.insert(schema.socialLinks).values([
      { label: "GitHub", url: "https://github.com/example", icon: "github", showInHeader: true, position: 0 },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/example", icon: "linkedin", showInHeader: true, position: 1 },
      { label: "WhatsApp", url: "https://wa.me/254700000000", icon: "whatsapp", showInHeader: false, position: 2 },
      { label: "Email", url: "mailto:hello@example.com", icon: "email", showInHeader: false, position: 3 },
    ]),

    db.insert(schema.contactMessages).values([
      { name: "Grace Wanjiru", email: "grace@example.com", message: "Hi Alex, we are building a logistics dashboard and would love to chat about a three-month contract." },
      { name: "Daniel Otieno", email: "daniel@example.com", message: "Loved your JSConf talk. Would you speak at our university tech club next month?", readAt: new Date() },
    ]),
  ]);

  console.info("Seed complete.");
}

main().catch((error: unknown) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
