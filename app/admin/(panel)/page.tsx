import Link from "next/link";
import { Award, EyeOff, FolderKanban, Images, Link2, Mail, Wrench, type LucideIcon } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSummary } from "@/server/db/queries/dashboard";

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export default async function DashboardPage() {
  const { counts, recentMessages } = await getDashboardSummary();

  const stats: { label: string; value: number; href: string; icon: LucideIcon; hint?: string }[] = [
    { label: "Unread messages", value: counts.unreadMessages, href: "/admin/messages", icon: Mail, hint: `${counts.messages} total` },
    { label: "Projects", value: counts.projects, href: "/admin/projects", icon: FolderKanban },
    { label: "Skills", value: counts.skills, href: "/admin/skills", icon: Wrench },
    { label: "Achievements", value: counts.achievements, href: "/admin/achievements", icon: Award },
    { label: "Gallery items", value: counts.gallery, href: "/admin/gallery", icon: Images },
    { label: "Social links", value: counts.socialLinks, href: "/admin/social-links", icon: Link2 },
    { label: "Hidden sections", value: counts.hiddenSections, href: "/admin/sections", icon: EyeOff },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Everything on the site, at a glance." />

      <ul role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value, href, icon: Icon, hint }) => (
          <li key={label}>
            <Link href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400">
              <Card className="transition-colors hover:border-zinc-400 dark:hover:border-zinc-600">
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardDescription>{label}</CardDescription>
                  <Icon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold tabular-nums">{value}</p>
                  {hint && <p className="pt-1 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>}
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Recent messages</CardTitle>
        </CardHeader>
        <CardContent>
          {recentMessages.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No messages yet.</p>
          ) : (
            <ul role="list" className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {recentMessages.map((message) => (
                <li key={message.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="truncate font-medium">{message.name}</span>
                  <span className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                    {!message.readAt && <Badge variant="default">New</Badge>}
                    <time dateTime={message.createdAt.toISOString()}>{dateFormat.format(message.createdAt)}</time>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
