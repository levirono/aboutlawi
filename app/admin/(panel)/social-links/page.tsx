import { AdminPageHeader } from "@/components/admin/page-header";
import { ResourceList } from "@/components/admin/resource-list";
import { Badge } from "@/components/ui/badge";
import { deleteSocialLinkAction } from "@/server/actions/content";
import { listSocialLinks } from "@/server/db/queries/content";
import { SOCIAL_ICON_LABELS } from "@/shared/constants";

export default async function AdminSocialLinksPage() {
  const links = await listSocialLinks();

  return (
    <>
      <AdminPageHeader title="Social links" description="Shown in the footer, on the Contact page and optionally in the header." newHref="/admin/social-links/new" newLabel="New link" />
      <ResourceList
        resource="socialLinks"
        headers={["Label", "URL", "Icon"]}
        deleteAction={deleteSocialLinkAction}
        emptyText="No social links yet."
        rows={links.map((link) => ({
          id: link.id,
          visible: link.visible,
          label: link.label,
          editHref: `/admin/social-links/${link.id}`,
          cells: [
            <span key="label" className="flex items-center gap-2 font-medium">
              {link.label}
              {link.showInHeader && <Badge variant="outline">Header</Badge>}
            </span>,
            <span key="url" className="block max-w-xs truncate text-zinc-500 dark:text-zinc-400">{link.url}</span>,
            <span key="icon" className="text-zinc-500 dark:text-zinc-400">{SOCIAL_ICON_LABELS[link.icon]}</span>,
          ],
        }))}
      />
    </>
  );
}
