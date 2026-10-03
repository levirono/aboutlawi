import { PageMetaForm, SiteSettingsForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteSettings, listPageMeta } from "@/server/db/queries/site";
import { PAGE_LABELS, PAGES } from "@/shared/constants";

export default async function AdminSettingsPage() {
  const [settings, metaRows] = await Promise.all([getSiteSettings(), listPageMeta()]);
  const metaByPage = new Map(metaRows.map((row) => [row.page, row]));

  return (
    <>
      <AdminPageHeader title="Settings & SEO" description="Site identity, default SEO and per-page meta tags." />

      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Site</CardTitle>
            <CardDescription>Used across every page and as the SEO fallback.</CardDescription>
          </CardHeader>
          <CardContent>
            <SiteSettingsForm settings={settings} />
          </CardContent>
        </Card>

        {PAGES.map((page) => (
          <Card key={page}>
            <CardHeader>
              <CardTitle>{PAGE_LABELS[page]} page SEO</CardTitle>
            </CardHeader>
            <CardContent>
              <PageMetaForm page={page} meta={metaByPage.get(page) ?? null} />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
