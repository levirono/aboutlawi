import { z } from "zod";
import { SectionForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PAGES } from "@/shared/constants";

const querySchema = z.object({ page: z.enum(PAGES).catch("home") });

export default async function NewSectionPage({ searchParams }: PageProps<"/admin/sections/new">) {
  const { page } = querySchema.parse(await searchParams);

  return (
    <>
      <AdminPageHeader title="New section" />
      <SectionForm page={page} />
    </>
  );
}
